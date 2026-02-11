const Event = require('../models/Event');
const scheduler = require('../utils/EventScheduler');

/**
 * Initialize the EventScheduler with all events from the database
 * Called on server startup
 */
const initializeScheduler = async () => {
  try {
    const events = await Event.findAll();
    scheduler.initialize(events);
  } catch (error) {
    console.error('Failed to initialize EventScheduler:', error);
  }
};

/**
 * GET /api/events
 * Get all events (sorted by date via BST)
 */
exports.getAllEvents = async (req, res, next) => {
  try {
    // Use BST for sorted retrieval if scheduler is initialized
    let events;
    if (scheduler.initialized) {
      events = scheduler.getAllEventsSorted();
    } else {
      events = await Event.findAll();
    }
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/events/search?q=prefix
 * Search events by name prefix using Trie
 */
exports.searchEvents = async (req, res, next) => {
  try {
    const { q } = req.query;
    let results;
    if (scheduler.initialized && q) {
      // Trie-based prefix search: O(m) where m = prefix length
      results = scheduler.searchByName(q);
    } else if (!q) {
      results = scheduler.initialized ? scheduler.getAllEventsSorted() : await Event.findAll();
    } else {
      // Fallback to DB search
      const events = await Event.findAll();
      results = events.filter(e => e.name.toLowerCase().includes(q.toLowerCase()));
    }
    res.status(200).json({ success: true, data: results, algorithm: 'Trie prefix search - O(m)' });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/events/conflicts
 * Find all overlapping events using IntervalTree
 */
exports.getConflicts = async (req, res, next) => {
  try {
    if (!scheduler.initialized) {
      const events = await Event.findAll();
      scheduler.initialize(events);
    }
    const conflicts = scheduler.getAllConflicts();
    res.status(200).json({
      success: true,
      data: {
        count: conflicts.length,
        conflicts: conflicts,
        algorithm: 'Interval Tree overlap detection - O(n log n + k)'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/events/upcoming?count=5
 * Get upcoming events using MinHeap priority queue
 */
exports.getUpcoming = async (req, res, next) => {
  try {
    const count = parseInt(req.query.count) || 5;
    if (!scheduler.initialized) {
      const events = await Event.findAll();
      scheduler.initialize(events);
    }
    const upcoming = scheduler.getUpcomingEvents(count);
    const next_event = scheduler.getNextUpcoming();
    res.status(200).json({
      success: true,
      data: {
        upcoming,
        next: next_event,
        algorithm: 'MinHeap priority queue - O(1) peek, O(log n) extract'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/events/range?start=ISO&end=ISO
 * Get events in a time range using BST range query
 */
exports.getEventsInRange = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ success: false, message: 'Please provide start and end query parameters' });
    }
    if (!scheduler.initialized) {
      const events = await Event.findAll();
      scheduler.initialize(events);
    }
    const events = scheduler.getEventsInRange(start, end);
    res.status(200).json({
      success: true,
      data: events,
      algorithm: 'BST range query - O(log n + k)'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/events/stats
 * Get comprehensive event system stats from all DSA structures
 */
exports.getEventStats = async (req, res, next) => {
  try {
    if (!scheduler.initialized) {
      const events = await Event.findAll();
      scheduler.initialize(events);
    }
    const stats = scheduler.getStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/events/:id
 * Get event by ID - O(1) via HashMap
 */
exports.getEventById = async (req, res, next) => {
  try {
    // Try HashMap first for O(1) lookup
    let event = scheduler.initialized ? scheduler.getEventById(req.params.id) : null;
    if (!event) {
      event = await Event.findById(req.params.id);
    }
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/events
 * Create a new event with conflict detection via IntervalTree
 */
exports.createEvent = async (req, res, next) => {
  try {
    const { name, start_date, end_date } = req.body;

    // Basic validation
    if (!name || !start_date || !end_date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, start_date, and end_date'
      });
    }

    // Validate dates
    const startTs = new Date(start_date).getTime();
    const endTs = new Date(end_date).getTime();
    if (isNaN(startTs) || isNaN(endTs)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }
    if (endTs < startTs) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Create in database
    const event = await Event.create(req.body);

    // Add to scheduler (includes conflict detection via IntervalTree)
    let conflictInfo = { conflicts: [], hasConflicts: false };
    if (scheduler.initialized) {
      conflictInfo = scheduler.addEvent(event);
    }

    res.status(201).json({
      success: true,
      data: event,
      conflicts: conflictInfo.conflicts.map(c => ({ id: c.id, name: c.name, start_date: c.start_date, end_date: c.end_date })),
      hasConflicts: conflictInfo.hasConflicts,
      algorithm: 'IntervalTree overlap check - O(log n + k)'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/events/:id
 * Update an event and re-index in all DSA structures
 */
exports.updateEvent = async (req, res, next) => {
  try {
    // Get old event for re-indexing
    const oldEvent = await Event.findById(req.params.id);
    if (!oldEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const event = await Event.update(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Re-index in scheduler
    let conflictInfo = { conflicts: [], hasConflicts: false };
    if (scheduler.initialized) {
      conflictInfo = scheduler.updateEvent(oldEvent, event);
    }

    res.status(200).json({
      success: true,
      data: event,
      conflicts: conflictInfo.conflicts.map(c => ({ id: c.id, name: c.name })),
      hasConflicts: conflictInfo.hasConflicts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/events/:id
 * Delete an event and remove from all DSA structures
 */
exports.deleteEvent = async (req, res, next) => {
  try {
    const eventToDelete = scheduler.initialized ? scheduler.getEventById(req.params.id) : await Event.findById(req.params.id);

    const event = await Event.delete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Remove from scheduler
    if (scheduler.initialized && eventToDelete) {
      scheduler.deleteEvent(eventToDelete);
    }

    res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (error) {
    next(error);
  }
};

// Export initializer for server startup
exports.initializeScheduler = initializeScheduler;

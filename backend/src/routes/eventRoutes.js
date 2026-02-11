
// ============= eventRoutes.js =============
const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventStats,
  searchEvents,
  getConflicts,
  getUpcoming,
  getEventsInRange
} = require('../controllers/eventController');

// DSA-powered routes (must come before /:id to avoid route conflicts)
router.get('/search', searchEvents);       // Trie-based prefix search
router.get('/conflicts', getConflicts);    // IntervalTree overlap detection
router.get('/upcoming', getUpcoming);      // MinHeap priority queue
router.get('/range', getEventsInRange);    // BST range query
router.get('/stats', getEventStats);       // All DSA stats combined

// CRUD routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);          // HashMap O(1) lookup
router.post('/', createEvent);             // IntervalTree conflict check on create
router.put('/:id', updateEvent);           // Re-index in all structures
router.delete('/:id', deleteEvent);        // Remove from all structures

module.exports = router;

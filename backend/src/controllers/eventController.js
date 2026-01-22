const Event = require('../models/Event');

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    // Placeholder for update logic
    // const event = await Event.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    // Placeholder for delete logic
    // await Event.delete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.getEventStats = async (req, res, next) => {
  try {
    // Placeholder for stats
    res.status(200).json({ success: true, data: { stats: 'mock data' } });
  } catch (error) {
    next(error);
  }
};

const Registration = require('../models/Registration');

exports.getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.findAll();
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    next(error);
  }
};

exports.createRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    next(error);
  }
};

exports.getRegistrationById = async (req, res, next) => {
  try {
    // Placeholder
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.searchRegistrations = async (req, res, next) => {
  try {
    // Placeholder
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    next(error);
  }
};

exports.updateRegistration = async (req, res, next) => {
  try {
    // Placeholder
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.checkInAttendee = async (req, res, next) => {
  try {
    // Placeholder
    res.status(200).json({ success: true, message: 'Checked in' });
  } catch (error) {
    next(error);
  }
};

exports.deleteRegistration = async (req, res, next) => {
  try {
    // Placeholder
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

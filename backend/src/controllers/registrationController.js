const Registration = require('../models/Registration');
const Trie = require('../utils/dsa/Trie');
const HashMap = require('../utils/dsa/HashMap');

// In-memory search structures for registrations
const registrationTrie = new Trie();
const registrationMap = new HashMap();
let isIndexed = false;

/**
 * Build search index from registrations
 */
const buildIndex = async (registrations) => {
  registrationTrie.clear();
  registrationMap.clear();
  for (const reg of registrations) {
    registrationTrie.insert(reg.name, reg);
    registrationTrie.insert(reg.email, reg);
    registrationMap.set(reg.id, reg);
  }
  isIndexed = true;
};

/**
 * GET /api/registrations
 */
exports.getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.findAll();
    if (!isIndexed) await buildIndex(registrations);
    res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/registrations
 */
exports.createRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.create(req.body);
    // Add to search index
    if (isIndexed) {
      registrationTrie.insert(registration.name, registration);
      registrationTrie.insert(registration.email, registration);
      registrationMap.set(registration.id, registration);
    }
    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/registrations/search?q=query
 * Trie-based search for registrations by name or email prefix
 */
exports.searchRegistrations = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!isIndexed) {
      const registrations = await Registration.findAll();
      await buildIndex(registrations);
    }

    let results;
    if (q && q.length > 0) {
      results = registrationTrie.search(q);
      // Deduplicate by id
      const seen = new Set();
      results = results.filter(r => {
        if (seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
      });
    } else {
      results = registrationMap.values();
    }

    res.status(200).json({
      success: true,
      data: results,
      algorithm: 'Trie prefix search - O(m)'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/registrations/:id
 * O(1) lookup via HashMap
 */
exports.getRegistrationById = async (req, res, next) => {
  try {
    // Try HashMap first
    let registration = isIndexed ? registrationMap.get(req.params.id) : null;
    if (!registration) {
      registration = await Registration.findById(req.params.id);
    }
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/registrations/:id
 */
exports.updateRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.update(req.params.id, req.body);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    // Re-index
    if (isIndexed) {
      registrationMap.set(registration.id, registration);
    }
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/registrations/:id/checkin
 */
exports.checkInAttendee = async (req, res, next) => {
  try {
    const registration = await Registration.checkIn(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    // Update index
    if (isIndexed) {
      registrationMap.set(registration.id, registration);
    }
    res.status(200).json({ success: true, data: registration, message: 'Checked in successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/registrations/:id
 */
exports.deleteRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.delete(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    // Remove from index
    if (isIndexed) {
      registrationMap.delete(registration.id);
    }
    res.status(200).json({ success: true, message: 'Registration deleted' });
  } catch (error) {
    next(error);
  }
};

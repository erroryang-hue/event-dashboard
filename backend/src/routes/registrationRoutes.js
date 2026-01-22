const express = require('express');
const router = express.Router();
const {
    getAllRegistrations,
    searchRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    checkInAttendee,
    deleteRegistration
} = require('../controllers/registrationController');

router.get('/', getAllRegistrations);
router.get('/search', searchRegistrations);
router.get('/:id', getRegistrationById);
router.post('/', createRegistration);
router.put('/:id', updateRegistration);
router.post('/:id/checkin', checkInAttendee);
router.delete('/:id', deleteRegistration);

module.exports = router;

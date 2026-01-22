const validateEvent = (req, res, next) => {
    const { name, date, location } = req.body;
    if (!name || !date || !location) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }
    next();
};

module.exports = { validateEvent };

const { query } = require('../config/database');

class Registration {
    static async findAll() {
        const res = await query('SELECT * FROM registrations');
        return res.rows;
    }

    static async create(registrationData) {
        const { event_id, user_email, user_name } = registrationData;
        const res = await query(
            'INSERT INTO registrations (event_id, user_email, user_name) VALUES ($1, $2, $3) RETURNING *',
            [event_id, user_email, user_name]
        );
        return res.rows[0];
    }
}

module.exports = Registration;

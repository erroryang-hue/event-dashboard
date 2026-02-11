// ============= backend/src/models/Registration.js =============
const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Registration {
    static async findAll() {
        const res = await query('SELECT * FROM registrations ORDER BY registration_date DESC');
        return res.rows;
    }

    static async findByEventId(eventId) {
        const res = await query('SELECT * FROM registrations WHERE event_id = $1 ORDER BY registration_date DESC', [eventId]);
        return res.rows;
    }

    static async findById(id) {
        const res = await query('SELECT * FROM registrations WHERE id = $1', [id]);
        return res.rows[0];
    }

    static async create(registrationData) {
        const { event_id, name, email, phone, ticket_type, status } = registrationData;
        const id = uuidv4();
        const res = await query(
            `INSERT INTO registrations (id, event_id, name, email, phone, ticket_type, status, registration_date) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING *`,
            [id, event_id, name, email, phone, ticket_type, status || 'registered']
        );
        return res.rows[0];
    }

    static async update(id, registrationData) {
        const { name, email, phone, ticket_type, status } = registrationData;
        const res = await query(
            `UPDATE registrations 
             SET name = $1, email = $2, phone = $3, ticket_type = $4, status = $5 
             WHERE id = $6 RETURNING *`,
            [name, email, phone, ticket_type, status, id]
        );
        return res.rows[0];
    }

    static async checkIn(id) {
        const res = await query(
            `UPDATE registrations 
             SET status = 'checked-in', check_in_date = CURRENT_TIMESTAMP 
             WHERE id = $1 RETURNING *`,
            [id]
        );
        return res.rows[0];
    }

    static async delete(id) {
        const res = await query('DELETE FROM registrations WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }

    static async getAnalytics() {
        const res = await query(
            `SELECT COUNT(*) AS total_registrations,
                    COUNT(CASE WHEN status = 'checked-in' THEN 1 END) AS checked_in,
                    COUNT(CASE WHEN status != 'checked-in' THEN 1 END) AS pending
             FROM registrations`
        );
        return res.rows[0];
    }
}

module.exports = Registration;

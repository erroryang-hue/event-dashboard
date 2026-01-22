// Basic Event Model Structure mimicking database operations
const { query } = require('../config/database');

class Event {
    static async findAll() {
        const res = await query('SELECT * FROM events');
        return res.rows;
    }

    static async findById(id) {
        const res = await query('SELECT * FROM events WHERE id = $1', [id]);
        return res.rows[0];
    }

    static async create(eventData) {
        const { name, date, location, description } = eventData;
        const res = await query(
            'INSERT INTO events (name, date, location, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, date, location, description]
        );
        return res.rows[0];
    }
}

module.exports = Event;

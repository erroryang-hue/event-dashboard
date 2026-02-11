const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Event {
    static async findAll() {
        const res = await query('SELECT * FROM events ORDER BY start_date DESC');
        return res.rows;
    }

    static async findById(id) {
        const res = await query('SELECT * FROM events WHERE id = $1', [id]);
        return res.rows[0];
    }

    static async create(eventData) {
        const { name, description, start_date, end_date, location, capacity, status } = eventData;
        const id = uuidv4();
        const res = await query(
            'INSERT INTO events (id, name, description, start_date, end_date, location, capacity, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [id, name, description, start_date, end_date, location, capacity || 0, status || 'draft']
        );
        return res.rows[0];
    }

    static async update(id, eventData) {
        const { name, description, start_date, end_date, location, capacity, status } = eventData;
        const res = await query(
            `UPDATE events 
             SET name = $1, description = $2, start_date = $3, end_date = $4, location = $5, capacity = $6, status = $7, updated_at = CURRENT_TIMESTAMP
             WHERE id = $8 RETURNING *`,
            [name, description, start_date, end_date, location, capacity, status, id]
        );
        return res.rows[0];
    }

    static async delete(id) {
        await query('DELETE FROM registrations WHERE event_id = $1', [id]);
        await query('DELETE FROM sales WHERE event_id = $1', [id]);
        const res = await query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }
}

module.exports = Event;

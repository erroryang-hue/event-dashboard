const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Sale {
    static async findAll() {
        const res = await query('SELECT * FROM sales ORDER BY transaction_date DESC');
        return res.rows;
    }

    static async findByEventId(eventId) {
        const res = await query('SELECT * FROM sales WHERE event_id = $1 ORDER BY transaction_date DESC', [eventId]);
        return res.rows;
    }

    static async findById(id) {
        const res = await query('SELECT * FROM sales WHERE id = $1', [id]);
        return res.rows[0];
    }

    static async create(saleData) {
        const { event_id, registration_id, amount, type, payment_status } = saleData;
        const id = uuidv4();
        const res = await query(
            `INSERT INTO sales (id, event_id, registration_id, amount, type, payment_status, transaction_date) 
             VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *`,
            [id, event_id, registration_id, amount, type, payment_status || 'pending']
        );
        return res.rows[0];
    }

    static async update(id, saleData) {
        const { amount, type, payment_status } = saleData;
        const res = await query(
            `UPDATE sales 
             SET amount = $1, type = $2, payment_status = $3 
             WHERE id = $4 RETURNING *`,
            [amount, type, payment_status, id]
        );
        return res.rows[0];
    }

    static async delete(id) {
        const res = await query('DELETE FROM sales WHERE id = $1 RETURNING *', [id]);
        return res.rows[0];
    }

    static async getAnalytics() {
        const res = await query(
            `SELECT COALESCE(SUM(amount), 0) AS total_sales, 
                    COALESCE(AVG(amount), 0) AS avg_ticket_price 
             FROM sales`
        );
        return res.rows[0];
    }

    static async getRecentSales(limit = 10) {
        const res = await query(
            'SELECT * FROM sales ORDER BY transaction_date DESC LIMIT $1',
            [limit]
        );
        return res.rows;
    }
}

module.exports = Sale;

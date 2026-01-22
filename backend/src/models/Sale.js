const { query } = require('../config/database');

class Sale {
    static async create(saleData) {
        const { event_id, amount, timestamp } = saleData;
        const res = await query(
            'INSERT INTO sales (event_id, amount, timestamp) VALUES ($1, $2, $3) RETURNING *',
            [event_id, amount, timestamp]
        );
        return res.rows[0];
    }

    static async getAnalytics() {
        const res = await query('SELECT SUM(amount) as total_sales, COUNT(*) as total_transactions FROM sales');
        return res.rows[0];
    }
}

module.exports = Sale;

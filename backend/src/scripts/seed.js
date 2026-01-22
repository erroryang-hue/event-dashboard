const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

const runSeed = async () => {
    try {
        const seedPath = path.join(__dirname, '../../../database/seeds/sample_data.sql');

        console.log('Reading seed file from:', seedPath);

        if (!fs.existsSync(seedPath)) {
            console.error('Seed file not found at:', seedPath);
            process.exit(1);
        }

        const sql = fs.readFileSync(seedPath, 'utf8');

        console.log('Seeding database...');
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(sql);
            await client.query('COMMIT');
            console.log('Database seeded successfully');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

runSeed();

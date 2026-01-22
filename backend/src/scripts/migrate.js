const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

const runMigration = async () => {
    try {
        const schemaPath = path.join(__dirname, '../../../database/migrations/001_initial_schema.sql');

        console.log('Reading migration file from:', schemaPath);

        if (!fs.existsSync(schemaPath)) {
            console.error('Migration file not found at:', schemaPath);
            process.exit(1);
        }

        const sql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing migration...');
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(sql);
            await client.query('COMMIT');
            console.log('Migration completed successfully');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

runMigration();

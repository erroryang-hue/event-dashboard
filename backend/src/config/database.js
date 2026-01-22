const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'event_manager',
      password: process.env.DB_PASSWORD || 'password',
      port: process.env.DB_PORT || 5432,
    }
);

// Test the connection
const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Connected to database successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

const query = (text, params) => pool.query(text, params);

const transaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
  transaction,
  pool,
  connectDB,
};
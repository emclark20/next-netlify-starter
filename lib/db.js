// lib/db.js
const { Pool } = require('pg');

// Create a new pool for each request instead of reusing
const getPool = () => {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    // Add this to force clean connections
    max: 1,
    idleTimeoutMillis: 120000,
  });
};

// Modified query function
const query = async (text, params) => {
  const pool = getPool();
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Query error', { text, error });
    throw error;
  } finally {
    // Always close the pool after using it
    await pool.end();
  }
};

module.exports = { query };
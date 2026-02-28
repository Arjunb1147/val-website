// ============================================================
// DB.JS — PostgreSQL Database Connection
//
// WHY THIS FILE EXISTS:
// When a visitor fills out the "Get in Touch" form, we need to
// save their inquiry somewhere permanent (not just in-memory).
// This file sets up the connection to our PostgreSQL database
// so that other files can read from / write to it.
//
// WHAT IS A "CONNECTION POOL"?
// Imagine a pool of phone lines to the database. Instead of
// dialing a new phone call for every single form submission
// (slow and wasteful), we keep several lines open and ready.
// When a request comes in, we grab an available line, use it,
// and put it back. This makes the app much faster.
//
// HOW OTHER FILES USE THIS:
// They import this pool and call pool.query("SQL here").
// For example: pool.query("SELECT * FROM leads") → fetches all leads.
//
// CONFIGURATION (TWO MODES):
// 1. PRODUCTION (Render.com): Uses the DATABASE_URL environment variable
//    provided by Render's managed PostgreSQL. This is a single URL string
//    like "postgres://user:password@host:5432/dbname" that contains
//    everything needed to connect.
//
// 2. LOCAL DEVELOPMENT: Falls back to localhost settings when DATABASE_URL
//    is not set (i.e., when running on your own machine).
// ============================================================

// "pg" is the Node.js library for talking to PostgreSQL databases.
// We only need the "Pool" class from it (not the full library).
const { Pool } = require("pg");

// Create the connection pool.
// If DATABASE_URL exists (set by Render.com in production), use it.
// Otherwise, fall back to local development settings.
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        // PRODUCTION: Connect using the full database URL from Render.
        connectionString: process.env.DATABASE_URL,
        // Render's PostgreSQL requires SSL (encrypted connection).
        // "rejectUnauthorized: false" allows Render's self-signed SSL certificate.
        ssl: { rejectUnauthorized: false },
      }
    : {
        // LOCAL DEVELOPMENT: Connect to PostgreSQL on your own machine.
        host: "localhost",
        port: 5432,
        database: "val_db",
      }
);

// Export the pool so other files (like api.js) can use it to run queries.
// Think of this as making the "database phone line" available company-wide.
module.exports = pool;

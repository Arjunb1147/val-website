// ============================================================
// INIT-DB.JS — Database Table Setup Script (Run Once)
//
// WHY THIS FILE EXISTS:
// Before we can store any leads, we need to tell PostgreSQL
// what our "leads" table looks like — what columns it has,
// what type of data each column holds, etc. This is like
// creating a blank spreadsheet with column headers before
// you start entering data.
//
// HOW TO USE:
// Run this ONCE when setting up the project for the first time:
//   node init-db.js
//
// It's safe to run again — "IF NOT EXISTS" means it won't
// overwrite or duplicate the table if it already exists.
//
// WHAT IT CREATES:
// A "leads" table that stores every inquiry submitted via the
// "Get in Touch" contact form on the website. Think of it as
// a spreadsheet with these columns:
//
//   | id | name | email | interest_area | message | created_at |
//   |----|------|-------|---------------|---------|------------|
//   | 1  | John | j@... | AI, ML & ...  | Hi...   | 2026-01-18 |
//
// Each row = one form submission from a potential customer.
// ============================================================

// Import the database connection from db.js
const pool = require("./db");

// "async" means this function involves waiting for the database —
// we send a command and wait for PostgreSQL to finish before continuing.
async function initDatabase() {
  try {
    // This SQL command creates the "leads" table in PostgreSQL.
    // "IF NOT EXISTS" = only create it if it doesn't already exist (safe to re-run).
    //
    // Column breakdown:
    //   id            — Auto-incrementing number (1, 2, 3...). Each lead gets a unique ID.
    //                   "SERIAL PRIMARY KEY" means PostgreSQL handles this automatically.
    //   name          — The visitor's name (from the "Your Name" field).
    //                   "VARCHAR(255)" = text up to 255 characters. "NOT NULL" = required.
    //   email         — The visitor's email (from the "Your Email" field).
    //                   Also required (NOT NULL) so we can follow up with them.
    //   interest_area — Which program they selected from the dropdown (e.g., "AI, ML & Data Analytics").
    //                   Optional — they might not pick one, so no "NOT NULL" here.
    //   message       — Their message/inquiry from the textarea.
    //                   "TEXT" = can hold very long messages (no 255-char limit).
    //   created_at    — The exact date and time the form was submitted.
    //                   "DEFAULT NOW()" = PostgreSQL fills this in automatically.
    //                   Useful for sorting leads by newest first.
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        interest_area VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Table 'leads' created successfully (or already exists).");
  } catch (err) {
    console.error("Error creating table:", err.message);
  } finally {
    // Close the database connection when done.
    // We only need it open for this one-time setup, then we're finished.
    await pool.end();
  }
}

// Run the function immediately when this script is executed.
initDatabase();

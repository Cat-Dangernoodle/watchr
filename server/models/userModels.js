/* eslint-disable linebreak-style */
const { Pool, Client } = require('pg');
const variables = require('../../variables');

const PG_URI = variables.SQLstring;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// Database schema available here:

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query!', text);
    return pool.query(text, params, callback);
  },
};

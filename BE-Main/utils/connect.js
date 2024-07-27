const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE,
  ssl: false // Disable SSL
});

pool.connect().then(() => {
  console.log("Connected to the PostgreSQL database!");
}).catch(err => {
  console.error('Connection error', err.stack);
});

module.exports = pool;

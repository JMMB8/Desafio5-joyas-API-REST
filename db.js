const { Pool } = require("pg");
const { db } = require("./config.js");


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "joyas",
  password: "5411747",
  port: 5432,
  allowExitOnIdle: true,
});

module.exports = { pool };

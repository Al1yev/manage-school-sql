const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Aliyev_4380",
  host: "localhost",
  port: 5432,
  database: "project_school",
});

module.exports = pool;

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Aliyev_4380",
  host: "localhost",
  port: 5432,
  database: "project_school",
});

pool.connect((err) => {
  if (err) {
    console.log("Could not connect to postgres:", err);
    process.exit();
  }
  console.log("Connected to postgres");
});

module.exports = pool;

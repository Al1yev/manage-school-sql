const app = require("./middleware/app");
require("dotenv").config({ path: "./config.env" });

app.listen((SERVER_PORT = process.env.SERVER_PORT), (err) =>
  err
    ? console.log(err)
    : console.log(`Server is listening on localhost:${SERVER_PORT}`)
);

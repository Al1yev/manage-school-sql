const express = require("express");
const app = express();

const studentRouter = require("../router/studentRouter");

app.use(express.json());

app.use("/api/v1/student", studentRouter);

module.exports = app;

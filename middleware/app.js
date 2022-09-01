const express = require("express");
const app = express();
const morgan = require("morgan");

const studentRouter = require("../router/studentRouter");
const authRouter = require("../router/authRouter");

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;

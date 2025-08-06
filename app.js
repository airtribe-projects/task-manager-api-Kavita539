const express = require("express");
const tasksRouter = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tasks", tasksRouter)

module.exports = app;

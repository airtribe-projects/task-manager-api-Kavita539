const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [
  {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using Magic",
    completed: false,
  },
];

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

// Retrieve tasks
app.get("/api/v1/tasks", (req, res) => {
  res.send(tasks);
});

// Retrieve task by an ID
app.get("/api/v1/tasks/:taskId", (req, res) => {
  const taskID = Number(req.params.taskId);
  const task = tasks.find((task) => task.id === taskID);
  res.send(task);
});

module.exports = app;

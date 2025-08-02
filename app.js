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

// Create a task
app.post("/api/v1/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  const newID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  const newTask = {
    id: newID,
    title,
    description,
    completed,
  };
  tasks.push(newTask);
  return res.send(tasks);
});

// update a task by its id

app.put("/api/v1/tasks/:taskId", (req, res) => {
    const taskID = Number(req.params.taskId);
    const {title, description, completed} = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskID);
    console.log(taskIndex)
    tasks[taskIndex].title = title
    tasks[taskIndex].description = description
    tasks[taskIndex].completed = completed
    res.send(tasks[taskIndex])
})

module.exports = app;

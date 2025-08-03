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

const validateTaskInput = (title, description, completed) => {
  if (title === undefined || typeof title !== "string" || title.trim() === "") {
    return "title is required and must be a non empty string";
  }
  if (
    description === undefined ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return "Description is required and must be a non empty string";
  }
  if (typeof completed !== "boolean") {
    return "Completed must be boolean value";
  }

  return null;
};

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
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json(task);
});

// Create a task
app.post("/api/v1/tasks", (req, res) => {
  const { title, description, completed } = req.body;

  const validationError = validateTaskInput(title, description, completed);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const newID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  const newTask = {
    id: newID,
    title,
    description,
    completed,
  };
  tasks.push(newTask);
  res.status(201).json(tasks);
});

// update an existing task by its id
app.put("/api/v1/tasks/:taskId", (req, res) => {
  const taskID = Number(req.params.taskId);
  if (!Number.isInteger(taskID) || taskID <= 0) {
    return res.status(400).json({ error: "Task ID must be a valid number" });
  }

  const { title, description, completed } = req.body;
  const validationError = validateTaskInput(title, description, completed);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const taskIndex = tasks.findIndex((task) => task.id === taskID);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex].title = title;
  tasks[taskIndex].description = description;
  tasks[taskIndex].completed = completed;
  res.status(200).json(tasks[taskIndex]);
});

// delete a task by its id
app.delete("/api/v1/tasks/:taskId", (req, res) => {
  const taskID = Number(req.params.taskId);
  if (!Number.isInteger(taskID) || taskID <= 0) {
    return res.status(400).json({ error: "Task ID must be a valid number" });
  }

  const taskExists = tasks.some((task) => task.id === taskID);
  if (!taskExists) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTasks = tasks.filter((task) => task.id !== taskID);
  res.status(200).json({
    message: `Task with id ${taskID} deleted successfully`,
    tasks: updatedTasks,
  });
});

module.exports = app;

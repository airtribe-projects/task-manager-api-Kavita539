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
    createdAt: new Date(),
    priority: "medium",
  },
];

const validateTaskInput = (title, description, completed, priority) => {
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
  const allowedPriorities = ["low", "medium", "high"];
  if (!allowedPriorities.includes(priority)) {
    return "Priority must be one of: low, medium, high";
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
  const { completed, sort } = req.query;
  let filteredTasks = [...tasks];

  if (completed !== undefined) {
    if (completed !== "true" && completed !== "false") {
      return res.status(400).json({ error: "Completed must be true or false" });
    }
    filteredTasks = filteredTasks.filter(
      (task) => task.completed === (completed === "true")
    );
  }

  if (sort === "asc" || sort === "desc") {
    filteredTasks.sort((a, b) => {
      if (sort === "asc") return new Date(a.createdAt) - new Date(b.createdAt);
      else return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  res.status(200).json(filteredTasks);
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

// Retrieve task by a priority level
app.get("/api/v1/tasks/priority/:level", (req, res) => {
  const { level } = req.params;
  const allowedPriorities = ["low", "medium", "high"];
  if (!allowedPriorities.includes(level)) {
    return res.status(400).json({ error: "Invalid priority level" });
  }

  const filtered = tasks.filter((task) => task.priority === level.toLowerCase());
  res.status(200).json(filtered);
});

// Create a task
app.post("/api/v1/tasks", (req, res) => {
  const { title, description, completed, priority } = req.body;

  const validationError = validateTaskInput(
    title,
    description,
    completed,
    priority
  );
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const newID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  const newTask = {
    id: newID,
    title,
    description,
    completed,
    createdAt: new Date(),
    priority,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// update an existing task by its id
app.put("/api/v1/tasks/:taskId", (req, res) => {
  const taskID = Number(req.params.taskId);
  if (!Number.isInteger(taskID) || taskID <= 0) {
    return res.status(400).json({ error: "Task ID must be a valid number" });
  }

  const { title, description, completed, priority } = req.body;
  const validationError = validateTaskInput(
    title,
    description,
    completed,
    priority
  );
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const taskIndex = tasks.findIndex((task) => task.id === taskID);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description,
    completed,
    priority,
  };

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

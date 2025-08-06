import tasks from "../models/taskModel.js";
import validateTaskId from "../utils/validateTaskId.js";

// Retrieve tasks
export const getAllTasks = (req, res) => {
  try {
    const { completed, sort } = req.query;
    let filteredTasks = [...tasks];

    if (completed !== undefined) {
      if (completed !== "true" && completed !== "false") {
        return res
          .status(400)
          .json({ error: "Completed must be true or false" });
      }
      filteredTasks = filteredTasks.filter(
        (task) => task.completed === (completed === "true")
      );
    }

    if (sort === "asc" || sort === "desc") {
      filteredTasks.sort((a, b) => {
        if (sort === "asc")
          return new Date(a.createdAt) - new Date(b.createdAt);
        else return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    res.status(200).json(filteredTasks);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve task by an ID
export const getTasksById = (req, res) => {
  try {
    const taskID = Number(req.params.taskId);
    if (!Number.isInteger(taskID) || taskID <= 0) {
      return res
        .status(400)
        .json({ error: "Task ID must be a positive integer" });
    }
    const task = tasks.find((task) => task.id === taskID);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve task by a priority level
export const getTasksByPriorityLevel = (req, res) => {
  try {
    const { level } = req.params;
    const allowedPriorities = ["low", "medium", "high"];
    if (!allowedPriorities.includes(level)) {
      return res.status(400).json({ error: "Invalid priority level" });
    }

    const filtered = tasks.filter(
      (task) => task.priority === level.toLowerCase()
    );
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a task
export const createTasks = (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;

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
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update an existing task by its id
export const updateTasksById = (req, res) => {
  try {
    const { valid, id, error } = validateTaskId(req.params.taskId);
    if (!valid) return res.status(400).json({ error });
    const { title, description, completed, priority } = req.body;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;
    if (priority !== undefined) tasks[taskIndex].priority = priority;

    res.status(200).json(tasks[taskIndex]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete a task by its id
export const deleteTasksById = (req, res) => {
  try {
    const { valid, id, error } = validateTaskId(req.params.taskId);
    if (!valid) return res.status(400).json({ error });

    const taskExists = tasks.some((task) => task.id === id);
    if (!taskExists) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTasks = tasks.filter((task) => task.id !== id);

    res.status(200).json({
      message: `Task with id ${id} deleted successfully`,
      tasks: updatedTasks,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const express = require("express");

const {
  getAllTasks,
  getTasksById,
  getTasksByPriorityLevel,
  createTasks,
  updateTasksById,
  deleteTasksById,
} = require("../controllers/taskController");
const { loggerMiddleWare } = require("../middlewares/loggerMiddleWare");
const { validateTaskInputMiddleware } = require("../middlewares/validateTaskMiddleware");

const router = express.Router();
router.use(loggerMiddleWare);

router.get("/", getAllTasks);
router.get("/:taskId", getTasksById);
router.get("/priority/:level", getTasksByPriorityLevel);
router.post("/", validateTaskInputMiddleware, createTasks);
router.put("/:taskId", validateTaskInputMiddleware, updateTasksById);
router.delete("/:taskId", deleteTasksById);

module.exports = router;

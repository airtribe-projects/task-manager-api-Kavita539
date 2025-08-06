const validateTaskId = (taskId) => {
  const id = Number(taskId);
  if (!Number.isInteger(id) || id <= 0) {
    return { valid: false, error: "Task ID must be a positive integer" };
  }
  return { valid: true, id };
};

module.exports = validateTaskId
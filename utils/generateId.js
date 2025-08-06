module.exports = function generateId(tasks) {
  return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
};

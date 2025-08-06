const validateTaskInputMiddleware = (req, res, next) => {
  const { title, description, completed, priority } = req.body;

  if (title === undefined || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be a non-empty string" });
  }

  if (
    description === undefined ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res.status(400).json({ error: "Description is required and must be a non-empty string" });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed must be a boolean value" });
  }

  const allowedPriorities = ["low", "medium", "high"];
  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({ error: "Priority must be one of: low, medium, high" });
  }

  next();
};

module.exports = {validateTaskInputMiddleware}

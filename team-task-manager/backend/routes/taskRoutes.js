const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE TASK
router.post("/", async (req, res) => {
  const { title, projectId } = req.body;
  const task = new Task({ title, projectId });
  await task.save();
  res.json(task);
});

// GET TASKS BY PROJECT
router.get("/:projectId", async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(task);
});

module.exports = router;
const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const project = new Project({ name });
    await project.save();

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating project" });
  }
});

// GET PROJECTS
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});
// DELETE PROJECT
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting project" });
  }
});
module.exports = router;
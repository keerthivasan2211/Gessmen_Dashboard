
const express = require("express");
const router = express.Router();
const Project = require("../Models/Project");


router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const projects = await Project.find(filter).populate("assignedEmployees").sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, client, startDate, endDate, status, assignedEmployees } = req.body;
    if (!name || !client || !startDate || !endDate) {
      return res.status(400).json({ message: "name, client, startDate and endDate are required" });
    }
    const project = new Project({
      name,
      client,
      startDate,
      endDate,
      status,
      assignedEmployees: assignedEmployees || []
    });
    await project.save();
    const populated = await Project.findById(project._id).populate("assignedEmployees");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const project = await Project.findByIdAndUpdate(id, update, { new: true }).populate("assignedEmployees");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

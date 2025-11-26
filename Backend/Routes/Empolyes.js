
const express = require("express");
const router = express.Router();
const Employee = require("../Models/Empolyess");


router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ message: "name, email and role are required" });
    }
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Employee with this email already exists" });
    }
    const employee = new Employee({ name, email, role });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const Employee = require("../Models/Employee");

const router = express.Router();

router.post("/add", async (req, res) => {
    const { name, employeeId, username, password, role, permissions } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = new Employee({
            name,
            employeeId,
            username,
            password: hashedPassword,
            role,
            permissions,
        });
        await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error creating employee: " + error.message });
    }
});

module.exports = router;

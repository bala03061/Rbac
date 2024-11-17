const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../Models/Employee");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Employee.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials!" });

        const token = jwt.sign(
            { id: user._id, role: user.role, permissions: user.permissions },
            "your_jwt_secret",
            { expiresIn: "1h" }
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

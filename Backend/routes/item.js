const express = require("express");
const Item = require("../models/Item");
const router = express.Router();

router.get("/", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

router.post("/add", async (req, res) => {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });
    await newItem.save();
    res.json({ message: "Item added successfully!" });
});

router.delete("/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully!" });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Link = require("../models/Link"); 

router.get("/", async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { original, short, remarks } = req.body;
  const newLink = new Link({
    original,
    short,
    remarks,
    clicks: 0,
    status: "Active",
  });

  try {
    const savedLink = await newLink.save();
    res.status(201).json(savedLink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

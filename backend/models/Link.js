const express = require("express");
const router = express.Router();
const Link = require("../models/Link"); // MongoDB Model

// Get all links
router.get("/links", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = 10; // Show only 10 items per page
    const skip = (page - 1) * limit; // Calculate how many to skip

    const totalLinks = await Link.countDocuments(); // Get total link count
    const links = await Link.find()
      .sort({ createdAt: -1 }) // Latest links first
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      links,
      totalPages: Math.ceil(totalLinks / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching links:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});


// Create a new link
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

const express = require("express");
const router = express.Router();
const Link = require("../models/Link"); // MongoDB Model

// Get all links (with user IP included)
router.get("/links", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalLinks = await Link.countDocuments();
    const links = await Link.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("url shortUrl createdAt userIp userDevice"); // ✅ Include user IP and device

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

// Create a new link (store user IP)
router.post("/links", async (req, res) => {
  try {
    const { url, shortUrl, remarks } = req.body;
    const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress; // ✅ Get user's IP

    if (!url || !remarks) {
      return res.status(400).json({ success: false, message: "URL and remarks are required." });
    }

    const newLink = await Link.create({
      url,
      shortUrl,
      remarks,
      userIp, // ✅ Save user IP
      clicks: 0,
      status: "Active",
    });

    res.status(201).json({ success: true, data: newLink });
  } catch (error) {
    console.error("Error creating link:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

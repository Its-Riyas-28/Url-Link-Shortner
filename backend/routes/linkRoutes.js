const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const linkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortUrl: { type: String, unique: true },
  remarks: { type: String, required: true },
  expirationDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  status: { type: String, default: "Active" },
});

const Link = mongoose.model("Link", linkSchema);

const generateShortUrl = () => {
  const baseUrl = "https://url-link-shortner-backend.onrender.com/api/v1"; // Use actual backend URL
  const uniqueId = Math.random().toString(36).substr(2, 6);
  return `${baseUrl}/${uniqueId}`;
};

router.get("/links", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = 10; // Only 10 records per page
    const skip = (page - 1) * limit; // Skip previous pages

    const totalLinks = await Link.countDocuments(); // Count total links
    const links = await Link.find()
      .sort({ createdAt: -1 }) // Show newest links first
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


// Route to create a short link
router.post("/links", async (req, res) => {
  try {
    const { url, remarks, expirationDate } = req.body;
    const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress; // Get user's IP

    if (!url || !remarks) {
      return res.status(400).json({ success: false, message: "URL and remarks are required." });
    }

    const shortUrl = generateShortUrl();
    const newLink = await Link.create({ url, shortUrl, remarks, expirationDate, userIp });

    res.status(201).json({ success: true, data: newLink });
  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});


// Route to handle short URL redirection
router.get("/:shortUrl", async (req, res) => {
  try {
    const link = await Link.findOne({ shortUrl: `https://url-link-shortner-backend.onrender.com/api/v1/${req.params.shortUrl}` });
    
    if (!link) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    link.clicks++;
    await link.save();

    res.redirect(link.url);
  } catch (error) {
    console.error("Error redirecting:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
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

// Route to fetch all links
router.get("/links", async (req, res) => {
  try {
    const links = await Link.find({}, { createdAt: 1, url: 1, shortUrl: 1, remarks: 1, clicks: 1, status: 1 });
    res.json({ success: true, links });
  } catch (error) {
    console.error("Error fetching links:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to create a short link
router.post("/links", async (req, res) => {
  try {
    const { url, remarks, expirationDate } = req.body;

    if (!url || !remarks) {
      return res.status(400).json({ success: false, message: "URL and remarks are required." });
    }

    const shortUrl = generateShortUrl();
    const newLink = await Link.create({ url, shortUrl, remarks, expirationDate });

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

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// ✅ Define Mongoose Schema for Link
const linkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortUrl: { type: String, unique: true }, // Add shortUrl field
  remarks: { type: String, required: true },
  expirationDate: { type: Date, default: null },
});

// ✅ Create Mongoose Model
const Link = mongoose.model("Link", linkSchema);

// ✅ Function to generate a short URL
const generateShortUrl = () => {
  const baseUrl = "http://url.st/"; // Change this to your actual short URL domain
  const uniqueId = Math.random().toString(36).substr(2, 6);
  return `${baseUrl}${uniqueId}`;
};

// ✅ GET Route - Fetch all links
router.get("/links", async (req, res) => {
  try {
    const links = await Link.find(); // Fetch all links from the database
    res.json({ success: true, links });
  } catch (error) {
    console.error("Error fetching links:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ POST Route - Create a new shortened link
router.post("/links", async (req, res) => {
  try {
    const { url, remarks, expirationDate } = req.body;

    if (!url || !remarks) {
      return res.status(400).json({ success: false, message: "URL and remarks are required." });
    }

    const shortUrl = generateShortUrl(); // Generate short URL

    // ✅ Save to Database
    const newLink = await Link.create({ url, shortUrl, remarks, expirationDate });

    res.status(201).json({ success: true, data: newLink });
  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const linkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortUrl: { type: String, unique: true }, 
  remarks: { type: String, required: true },
  expirationDate: { type: Date, default: null },
});

const Link = mongoose.model("Link", linkSchema);

const generateShortUrl = () => {
  const baseUrl = "http://url.st/"; 
  const uniqueId = Math.random().toString(36).substr(2, 6);
  return `${baseUrl}${uniqueId}`;
};

router.get("/links", async (req, res) => {
  try {
    const links = await Link.find(); 
    res.json({ success: true, links });
  } catch (error) {
    console.error("Error fetching links:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

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

module.exports = router;

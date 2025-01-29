const express = require("express");
const router = express.Router();
const Link = require("../models/Link"); // Import the Link model

// Fetch all links
router.get("/links", async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 }); // Fetch all links, sorted by creation date
    res.status(200).json({ success: true, links });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Create a new link
router.post("/links", async (req, res) => {
  try {
    const { originalUrl, remarks, expirationDate } = req.body;
    if (!originalUrl || !remarks) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Create a new link in the database
    const newLink = await Link.create({
      originalUrl,
      shortUrl: generateShortUrl(originalUrl), // Replace with a function to generate a short URL
      remarks,
      expirationDate,
    });

    res.status(201).json({ success: true, data: newLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete a link
router.delete("/links/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLink = await Link.findByIdAndDelete(id);
    if (!deletedLink) {
      return res.status(404).json({ success: false, message: "Link not found" });
    }

    res.status(200).json({ success: true, message: "Link deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Helper function to generate a short URL
const generateShortUrl = (originalUrl) => {
  const baseUrl = "http://short.ly/";
  const uniqueId = Math.random().toString(36).substr(2, 6); // Generate a random 6-character string
  return `${baseUrl}${uniqueId}`;
};

module.exports = router;

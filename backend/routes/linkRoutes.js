const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// ✅ Define Mongoose Schema for Link
const linkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  remarks: { type: String, required: true },
  expirationDate: { type: Date, default: null },
});

// ✅ Create Mongoose Model (Fix: Ensure it's defined!)
const Link = mongoose.model("Link", linkSchema);

// ✅ POST Route - Create a new link
router.post("/links", async (req, res) => {
  try {
    const { url, remarks, expirationDate } = req.body;

    // Validate Input Fields
    if (!url || !remarks) {
      return res.status(400).json({ success: false, message: "URL and remarks are required." });
    }

    // ✅ Save to Database (Fix: Use Correct Model)
    const newLink = await Link.create({ url, remarks, expirationDate });

    res.status(201).json({ success: true, data: newLink });
  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

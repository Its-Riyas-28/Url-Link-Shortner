const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Tracker = mongoose.model("Tracker", trackerSchema);
module.exports = Tracker;

const express = require("express");
const router = express.Router();
const UAParser = require("ua-parser-js");

router.get("/logs/fetch-location", async (req, res) => {
  try {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    ip = ip.replace(/^::ffff:/, "");
    if (ip === "::1") ip = "127.0.0.1";

    const userAgent = req.headers["user-agent"];
    const parser = new UAParser();
    const parsedData = parser.setUA(userAgent).getResult();

    const screenWidth = parseInt(req.query.screenWidth, 10) || 1200;

    let deviceType = "Unknown Device";

    if (screenWidth < 1024) {
      deviceType = "Mobile or Tablet";
    } else {
      if (parsedData.device.type === "mobile" || parsedData.device.type === "tablet") {
        deviceType = "Mobile or Tablet";
      } else {
        deviceType = "Desktop";
      }
    }

    const deviceInfo = {
      ip,
      deviceType,
      os: parsedData.os.name || "Unknown OS",
      browser: parsedData.browser.name || "Unknown Browser",
    };

    res.json(deviceInfo);
  } catch (error) {
    console.error("Error fetching IP and device info:", error);
    res.status(500).json({ status: "error", message: "IP and device tracking failed" });
  }
});

module.exports = router;

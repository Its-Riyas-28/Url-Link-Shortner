const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/auth");
const errorMiddleware = require("./middlewares/error"); // Import the error middleware
require("dotenv").config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:4173", // Local testing
      "https://url-link-shortner-frontend.onrender.com", // Frontend Render URL
    ],
    credentials: true, // Allow credentials
  })
);
app.use(express.json());
app.use("/api/v1", userRoutes);

// Error middleware (must come after all routes)
app.use(errorMiddleware);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err.message));

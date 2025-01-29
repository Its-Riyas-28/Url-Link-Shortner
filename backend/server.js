const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/auth");
const linkRoutes = require("./routes/linkRoutes"); // Adjust the path based on your structure
const errorMiddleware = require("./middlewares/error"); // Import the error middleware
require("dotenv").config({ path:"../backend/.env" });

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "https://url-link-shortner-frontend.onrender.com", 
    ],
    credentials: true, 
  })
);
app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", linkRoutes);

// Error middleware (must come after all routes)
app.use(errorMiddleware);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/auth");
const linkRoutes = require("./routes/linkRoutes"); 
const analyticsRoutes = require("./routes/analyticsRoutes"); 
const ipRoutes = require("./routes/analyticsRoutes"); // ✅ Added IP tracking route
const errorMiddleware = require("./middlewares/error");

require("dotenv").config({ path: "../backend/.env" });

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Trust proxy (needed for correct IP tracking on deployed environments)
app.set("trust proxy", true);

// ✅ CORS Configuration
app.use(cors({ origin:[
      "http://localhost:4173",
      "https://url-link-shortner-frontend.onrender.com", 
    ],
    credentials: true,
  }));
  
  app.use(express.json());
  
  // ✅ Register Routes
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", linkRoutes);
  app.use("/api/v1", analyticsRoutes); // ✅ Ensure IP tracking route is registered
  
  // ✅ Centralized Error Handling
  app.use(errorMiddleware);
  
  // ✅ Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err.message));
  
  // ✅ Start the Server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
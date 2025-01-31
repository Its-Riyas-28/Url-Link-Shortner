const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/auth");
const linkRoutes = require("./routes/linkRoutes"); 
const errorMiddleware = require("./middlewares/error"); 
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
app.get("/api/links", (req, res) => {
    res.json([{ id: 1, name: "Example Link" }]); 
});
app.use("/api/v1", userRoutes);
app.use("/api/v1", linkRoutes);

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

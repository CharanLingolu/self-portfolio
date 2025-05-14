const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ DB connected"))
  .catch(err => {
    console.error("❌ DB connection error:", err.message); // More detailed error logging
  });

// Define Schema & Model
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  phoneno: String
});

// Clear model cache to prevent overwrite in dev
mongoose.models = {};

// Recreate the model after clearing cache
const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

// POST route for Contact Form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, phoneno } = req.body;

    // Simple validation
    if (!name || !email || !message || !phoneno) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to MongoDB
    const contact = new Contact({ name, email, message, phoneno });
    await contact.save();

    console.log("✅ Contact saved to MongoDB");
    res.status(201).json({ message: "Message sent successfully!" });

  } catch (err) {
    console.error("❌ Error saving to MongoDB:", err.message); // More detailed error logging
    res.status(500).json({ error: "Error saving contact info" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

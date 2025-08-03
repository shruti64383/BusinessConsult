const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


const fs = require('fs');
const path = require('path');
const serviceRoutes = require('./routes/serviceRoutes');

const uploadPath = path.join(process.cwd(), 'uploads', 'documents');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log('📂 Created folder:', uploadPath);
}

// Route files
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");       // ✅ Added
const taskRoutes = require("./routes/taskRoutes");       // ✅ Will handle /api/tasks

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);       // ✅ User route added
app.use("/api/tasks", taskRoutes);      // ✅ Task route added
app.use('/uploads', express.static('uploads')); // Serve static files
app.use('/api/upload-documents', require('./routes/uploadRoutes'));
app.use('/api/services', serviceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

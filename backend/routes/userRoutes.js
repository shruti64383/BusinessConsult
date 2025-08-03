const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

// GET /api/user/me - returns logged-in user's info
router.get("/me", verifyToken, getMe);

module.exports = router;
//
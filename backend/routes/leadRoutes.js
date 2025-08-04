const express = require("express");
const router = express.Router();
const { getAllLeads, updateLeadPriority} = require("../controllers/leadController");
const {verifyToken} = require("../middleware/authMiddleware");

router.get("/", getAllLeads);

router.patch("/:leadId", updateLeadPriority);

module.exports = router;
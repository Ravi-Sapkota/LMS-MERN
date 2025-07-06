const express = require("express");
const router = express.Router();
const { getAdminSummary } = require("../controllers/adminController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

router.get(
  "/summary",
  authenticateToken,
  authorizeRole("admin"),
  getAdminSummary
);

module.exports = router;

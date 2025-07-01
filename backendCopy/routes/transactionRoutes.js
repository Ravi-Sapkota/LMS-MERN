const express = require("express");
const router = express.Router();

const {
  issueBook,
  returnBook,
  renewBook,
  getUserTransactions,
  getAllTransactions,
  getTotalFine,
} = require("../controllers/transactionController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Authenticated user routes
router.post("/issue/:bookId", authenticateToken, issueBook);
router.put("/return/:transactionId", authenticateToken, returnBook);
router.put("/renew/:transactionId", authenticateToken, renewBook);
router.get("/my", authenticateToken, getUserTransactions);

// Admin: See all transactions
router.get("/", authenticateToken, authorizeRole("admin"), getAllTransactions);
router.get("/fine/summary", authenticateToken, getTotalFine);

module.exports = router;

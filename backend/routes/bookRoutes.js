const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Public: Get all books or single book
router.get("/", getBooks);
router.get("/:id", getBookById);

// Admin only: Create, update, delete
router.post("/", authenticateToken, authorizeRole("admin"), createBook);
router.put("/:id", authenticateToken, authorizeRole("admin"), updateBook);
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteBook);

module.exports = router;

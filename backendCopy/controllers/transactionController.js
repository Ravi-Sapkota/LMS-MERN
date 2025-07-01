const Book = require("../models/Book");
const Transaction = require("../models/Transaction");

// Utility function to calculate due date (+14 days)
const getDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date;
};

// ISSUE
const issueBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.userId;

    const book = await Book.findById(bookId);
    if (!book || book.availableCopies < 1) {
      return res.status(400).json({ message: "Book not available" });
    }

    const newTransaction = new Transaction({
      user: userId,
      book: bookId,
      dueDate: getDueDate(),
    });

    await newTransaction.save();
    book.availableCopies -= 1;
    await book.save();

    res
      .status(201)
      .json({ message: "Book issued", transaction: newTransaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RETURN
const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId).populate(
      "book"
    );
    if (!transaction || transaction.returnDate) {
      return res.status(400).json({ message: "Invalid or already returned" });
    }

    const now = new Date();
    let fine = 0;
    if (now > transaction.dueDate) {
      const daysLate = Math.ceil(
        (now - transaction.dueDate) / (1000 * 60 * 60 * 24)
      );
      fine = daysLate * 5; // ₹5 per day late
    }

    transaction.returnDate = now;
    transaction.fine = fine;
    await transaction.save();

    transaction.book.availableCopies += 1;
    await transaction.book.save();

    res.json({ message: "Book returned", fine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RENEW
const renewBook = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction || transaction.returnDate) {
      return res.status(400).json({ message: "Invalid or already returned" });
    }

    transaction.dueDate = getDueDate();
    await transaction.save();

    res.json({ message: "Book renewed", newDueDate: transaction.dueDate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User's transactions
const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const records = await Transaction.find({ user: userId }).populate("book");
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// All transactions (admin only)
const getAllTransactions = async (req, res) => {
  try {
    const records = await Transaction.find().populate("book user");
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET total fine for a user (unpaid only)
const getTotalFine = async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await Transaction.find({
      user: userId,
      fine: { $gt: 0 },
    });

    const totalFine = transactions.reduce((acc, tx) => acc + tx.fine, 0);

    res.json({ totalFine, fineRecords: transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  issueBook,
  returnBook,
  renewBook,
  getUserTransactions,
  getAllTransactions,
  getTotalFine,
};

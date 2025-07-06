const Book = require("../models/Book");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const getAdminSummary = async (req, res) => {
  try {
    const [bookCount, userCount, transactionCount, fineTotal] =
      await Promise.all([
        Book.countDocuments(),
        User.countDocuments(),
        Transaction.countDocuments(),
        Transaction.aggregate([
          { $group: { _id: null, total: { $sum: "$fine" } } },
        ]),
      ]);

    res.json({
      books: bookCount,
      users: userCount,
      transactions: transactionCount,
      fines: fineTotal[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAdminSummary };

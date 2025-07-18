const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  changePassword,
  updateUserName,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/changePassword", changePassword);
router.put("/users/:id", updateUserName);

module.exports = router;

const express = require("express");
const router = express.Router();

//import validators
const {
  userRegisterValidator,
  userLogInValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators/index");

//import from controllers
const {
  register,
  registerActivate,
  login,
  requireSignIn,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);
router.post("/login", userLogInValidator, runValidation, login);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

router.get("/secret", requireSignIn, (req, res) => {
  res.json({ data: "this page only for logged" });
});

module.exports = router;

const express = require("express");
const router = express.Router();

//import validators
const {
  userRegisterValidator,
  userLogInValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators/index");

//import from controllers
const { register, registerActivate, login } = require("../controllers/auth");

router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);
router.post("/login", userLogInValidator, runValidation, login);

module.exports = router;

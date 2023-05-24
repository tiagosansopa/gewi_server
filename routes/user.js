const express = require("express");
const router = express.Router();

//import middlewares
const {
  requireSignIn,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

//import from controllers
const { read } = require("../controllers/user");

//route
router.get("/user", requireSignIn, authMiddleware, read);

module.exports = router;

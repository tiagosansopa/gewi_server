const express = require("express");
const router = express.Router();

//import middlewares
const {
  requireSignIn,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

//import from controllers
const { read, create, update, del } = require("../controllers/user");

//route
router.get("/user", requireSignIn, authMiddleware, read);
router.get("/admin", requireSignIn, adminMiddleware, read);
router.post("/user", create);
router.put("/user/:id", update);
router.delete("/user/:id", del);

module.exports = router;

const express = require("express");
const router = express.Router();

//import middlewares
const {
  requireSignIn,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

//import from controllers
const {
  read,
  create,
  update,
  del,
  readAmenities,
  updateAmenities,
  deleteAmenities,
} = require("../controllers/user");

//route
router.get("/user", requireSignIn, authMiddleware, read);
router.get("/admin", requireSignIn, adminMiddleware, read);
router.post("/user", create);
router.put("/user/:id", update);
router.delete("/user/:id", del);
router.get("/user/amenities/:id", readAmenities);
router.put("/user/amenities/:id", updateAmenities);
router.delete("/user/amenities/:id", deleteAmenities);

module.exports = router;

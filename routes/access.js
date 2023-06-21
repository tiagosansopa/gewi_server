const express = require("express");
const router = express.Router();

//import middlewares
const {
  getAll,
  getAllByUser,
  create,
  validateAccess,
} = require("../controllers/access");

//route
router.get("/access", getAll);
router.get("/access/:id", getAllByUser);
router.post("/access", create);
router.post("/key", validateAccess);

module.exports = router;

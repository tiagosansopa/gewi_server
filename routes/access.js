const express = require("express");
const router = express.Router();

//import middlewares
const { getAll } = require("../controllers/access");

//route
router.get("/access", getAll);

module.exports = router;

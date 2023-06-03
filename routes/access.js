const express = require("express");
const router = express.Router();

//import middlewares
const { getAll } = require("../controllers/access");

//import from controllers
const { read } = require("../controllers/user");

//route
router.get("/access", getAll);

module.exports = router;

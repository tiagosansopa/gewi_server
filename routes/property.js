const express = require("express");
const router = express.Router();

//import validators

//import controllers

const { readAll, write } = require("../controllers/property");

//routes
router.get("/properties", readAll);
router.post("/property/new", write);

module.exports = router;

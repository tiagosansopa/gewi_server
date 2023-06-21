const express = require("express");
const router = express.Router();

//import validators

//import controllers

const {
  readAll,
  write,
  readPropertiesFromUser,
} = require("../controllers/property");

//routes
router.get("/properties", readAll);
router.get("/properties/:id", readPropertiesFromUser);
router.post("/property/new", write);

module.exports = router;

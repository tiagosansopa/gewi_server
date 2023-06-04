const express = require("express");
const router = express.Router();

//import validator que aun no hay

//import controllers que aun no hay

const { getAmenities } = require("../controllers/amenity");

//routes

router.get("/amenities", getAmenities);

module.exports = router;

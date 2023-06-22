const express = require("express");
const router = express.Router();

//import and implement validators and middelwares

//import controllers

const {
  create,
  readOne,
  readAll,
  update,
  del,
  validateContact,
} = require("../controllers/contact");

router.post("/contact", create);
router.get("/contacts/:id", readAll);
router.get("/contact/:id", readOne);
router.put("/contact/:id", update);
router.delete("/contact/:id", del);
router.post("/contact/valid", validateContact);

module.exports = router;

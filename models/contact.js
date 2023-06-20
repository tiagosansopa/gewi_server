const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  phone: String,
  idNumber: Number,
  idImg: String,
});

module.exports = mongoose.model("Contact", contactSchema, "contacts");

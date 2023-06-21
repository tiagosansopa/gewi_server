const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const accessSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" },
    contact: { type: ObjectId, ref: "Contact" },
    property: { type: ObjectId, ref: "Property" },
    thumbnail: {
      type: String,
      required: true,
      max: 300,
      default: "/images/temp/access/qr1.png",
    },
    type: { type: String, required: true, max: 30 },
    start: Date,
    finish: Date,
    status: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Access", accessSchema, "access");

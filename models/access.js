const mongoose = require("mongoose");
const crypto = require("crypto");

// const accessCodeSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, max: 30 },
//     phone: { type: String, required: true, max: 30 },
//     place: { type: String, required: true, max: 30 },
//     startDate: { type: String, required: true, max: 30 },
//     endDate: { type: String, required: true, max: 30 },
//     hour: { type: String, required: true, max: 30 },
//     image: { url: String, key: String },
//     createdBy: {
//       type: isObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

const accessSchema = new mongoose.Schema(
  {
    place: { type: String, required: true, max: 30 },
    thumbnail: { type: String, required: true, max: 300 },
    dateTime: { type: String, required: true, max: 300 },
    type: { type: String, required: true, max: 30 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Access", accessSchema, "access");

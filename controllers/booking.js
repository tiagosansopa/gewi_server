const Booking = require("../models/booking");

const jwt = require("jsonwebtoken");
const { expressjwt: ejwt } = require("express-jwt");

exports.readBookingsByDay = (req, res) => {
  const { date } = req.body;
  console.table("uim", date);
  res.json({
    message: "todo bien",
    bookings: [
      {
        eventName: "Evento 1",
        finish: "2023-06-20T17:48:07.000+00:00",
        start: "2023-06-07T17:48:07.000+00:00",
        amenity: "5",
      },
    ],
  });
};

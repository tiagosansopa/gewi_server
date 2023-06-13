const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
const { expressjwt: ejwt } = require("express-jwt");

exports.readBookingsByMonth = (req, res) => {
  const { date } = req.body;
  console.log(date);
  const currentDay = new Date(date);
  console.log(currentDay);
  const year = currentDay.getFullYear();
  const month = currentDay.getMonth();
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  Booking.find({
    start: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .then((array) => {
      const newArray = array.map((booking) => {
        const localeDateString = booking.start.toLocaleDateString();
        const localeTimeString = booking.start.toLocaleTimeString();
        const updated = {
          eventName: booking.eventName,
          amenity: booking.amenity,
          start: booking.start,
          finish: booking.start,
        };
        return updated;
      });
      console.log("todobien");
      return res.status(200).json({
        message: "todo bien",
        bookings: newArray,
      });
    })
    .catch((error) => {
      res.status(401).json({
        error,
      });
    });
};

exports.createBooking = (req, res) => {
  const { eventName, start, finish, amenity } = req.body;
  const startDate = new Date(start).toLocaleTimeString();
  console.log(
    `listo para bookear ${eventName} el ${new Date(
      start
    ).toLocaleDateString()} a las ${startDate} en ${amenity} con utc ${start}`
  );
  const newBooking = new Booking({
    eventName,
    finish: start,
    start: start,
    amenity,
  });

  newBooking
    .save()
    .then((result) => {
      console.log(result);
      return res.json({
        message: "booking registered",
      });
    })
    .catch((error) => {
      res.status(401).json({
        error,
      });
    });
};

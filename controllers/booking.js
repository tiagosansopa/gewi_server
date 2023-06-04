const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
const { expressjwt: ejwt } = require("express-jwt");

exports.readBookingsByDay = (req, res) => {
  const { selectedDate } = req.body;
  const startDate = new Date(selectedDate);
  startDate.setUTCHours(0, 0, 0, 0); // Set the time to the beginning of the day (midnight UTC)
  const endDate = new Date(selectedDate);
  endDate.setUTCHours(23, 59, 59, 999); // Set the time to the end of the day (just before midnight UTC)

  Booking.find({
    start: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .then((array) => {
      console.log("array viejo: ", array);
      const newArray = array.map((booking) => {
        const localeDateString = booking.start.toLocaleDateString();
        const localeTimeString = booking.start.toLocaleTimeString();
        const updatedDateTime = `${localeDateString} ${localeTimeString}`;
        const updated = {
          eventName: booking.eventName,
          amenity: booking.amenity,
          start: updatedDateTime,
          finish: updatedDateTime,
        };
        return updated;
      });
      console.log("array local: ", newArray);
      return res.json({
        message: "todo bien",
        bookings: newArray,
      });
    })
    .catch((error) => {
      console.log(error);
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

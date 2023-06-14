const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
const { expressjwt: ejwt } = require("express-jwt");

exports.readBookingsByDay = (req, res) => {
  const { date } = req.body;
  console.log("bookings by day", date);

  const startOfDay = new Date(date); // Start of the day
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date); // End of the day
  endOfDay.setHours(23, 59, 59, 999);
  console.log("all day", date, startOfDay, endOfDay);
  Booking.find({
    start: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  })
    .then((array) => {
      console.log("eventos del dia", array);
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

exports.readBookingsByMonthAndAmenity = (req, res) => {
  console.log("bookings by month");
  const { date, amenity } = req.body;
  const currentDay = new Date(date);
  const year = currentDay.getFullYear();
  const month = currentDay.getMonth();
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  Booking.find({
    amenity: amenity,
    start: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .then((array) => {
      const groupedBookings = {};
      array.forEach((booking) => {
        const day = booking.start.getDate();
        if (!groupedBookings[day]) {
          groupedBookings[day] = [];
        }
        groupedBookings[day].push(booking.start);
      });
      const green = [];
      const orange = [];
      const red = [];

      Object.keys(groupedBookings).forEach((day) => {
        const bookingsOnDay = groupedBookings[day];
        if (bookingsOnDay.length > 0 && bookingsOnDay.length < 2) {
          green.push(groupedBookings[day][0]);
        } else if (bookingsOnDay.length > 1 && bookingsOnDay.length < 6) {
          orange.push(groupedBookings[day][0]);
        } else if (bookingsOnDay.length > 5) {
          red.push(groupedBookings[day][0]);
        }
      });

      const result = {
        "react-datepicker__day--highlighted-custom-2": green,
        "react-datepicker__day--highlighted-custom-3": orange,
        "react-datepicker__day--highlighted-custom-4": red,
      };

      return res.status(200).json({
        message: "todo bien",
        bookings: result,
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

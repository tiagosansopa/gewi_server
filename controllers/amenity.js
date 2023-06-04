const Amenity = require("../models/amenity");

exports.getAmenities = (req, res) => {
  Amenity.find({})
    .then((array) =>
      res.json({
        message: "todo bien con las amenidades",
        amenities: array,
      })
    )
    .catch((error) =>
      res.status(401).json({
        error,
      })
    );
};

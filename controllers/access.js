const Access = require("../models/access");

exports.getAll = (req, res) => {
  console.log("getAll");

  Access.find({})
    .then((all) => {
      return res.json({ message: "Exito", accesses: all });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        error: `Please try again.`,
      });
    });
};

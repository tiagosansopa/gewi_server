const { check } = require("express-validator");

exports.userRegisterValidator = [
  check("name").not().isEmpty().withMessage("Nombre requerido"),

  check("email").isEmail().withMessage("Debe ser un correo valido"),

  check("password").isLength({ min: 6 }).withMessage("Minimo 6 caracteres"),
];

exports.userLogInValidator = [
  check("email").isEmail().withMessage("Debe ser un correo valido"),

  check("password").isLength({ min: 6 }).withMessage("Minimo 6 caracteres"),
];

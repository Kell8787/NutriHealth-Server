const { body } = require("express-validator");

const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$/

validators.registerValidator = [
    body("username")
     .notEmpty().withMessage("Username is required")
     .isLength({ min:4, max:32 }).withMessage("Username format incorrect"),
    body("email")
     .notEmpty().withMessage("Email is required")
     .isEmail().withMessage("Email format incorrect"),
    body("password")
     .notEmpty().withMessage("Password is required")
     .matches(passwordRegexp).withMessage("Password format incorrect")
];

module.exports = validators;
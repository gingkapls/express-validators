const { body, validationResult } = require("express-validator");
const UsersStorage = require("../models/UsersStorage");

const alphaErr = "Must contain only alphabets";
const length = { min: 1, max: 10 };
const lengthErr = `Must be between ${length.min} and ${length.max} characters`;

const validateUser = [
  body("fname")
    .trim()
    .isAlpha()
    .withMessage(alphaErr)
    .isLength(length)
    .withMessage(lengthErr),
  body("lname")
    .trim()
    .isAlpha()
    .withMessage(alphaErr)
    .isLength(length)
    .withMessage(lengthErr),
];

exports.userCreateGet = (req, res) => {
  res.render("createUser", { title: "Create a user" });
};

exports.userCreatePost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("createUser", { title: "Create User", errors: errors.array() });
    }

    const { fname, lname } = req.body;
    UsersStorage.addUser({ fname, lname });
    res.redirect("/");
  },
];

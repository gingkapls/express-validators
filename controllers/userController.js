const { body, validationResult } = require("express-validator");
const UsersStorage = require("../models/UsersStorage");

const alphaErr = "must contain only alphabets";
const nameLength = { min: 1, max: 10 };
const lengthErr = `must be between ${nameLength.min} and ${nameLength.max} characters`;
const bioLength = { min: 0, max: 200 };

const validateUser = [
  body("fname")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength(nameLength)
    .withMessage(`First name ${lengthErr}`),
  body("lname")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength(nameLength)
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email is not in the correct format"),
  body("bio").trim().isLength(bioLength),
  body("age").trim().isNumeric().withMessage("Age should be a number"),
];

exports.userCreateGet = (req, res) => {
  res.render("createUser", { title: "Create a user" });
};

exports.userCreatePost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    const { fname, lname, email, age, bio } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create User",
        errors: errors.array(),
        user: { fname, lname, age, email, bio },
      });
    }

    UsersStorage.addUser({ fname, lname, age, email, bio });
    res.redirect("/");
  },
];

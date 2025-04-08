const { query, validationResult } = require("express-validator");
const UsersStorage = require("../models/UsersStorage");

const validateName = [
  query("name")
    .trim()
    .optional({ nullable: true, checkFalsy: true })
    .not()
    .isNumeric()
    .withMessage("Name should not contain numbers")
    .isLength({ min: 1, max: 21 })
    .withMessage("Name should be between 1 and 21 characters"),
];

errorHandler = (error, req, res, next) => {
  const {name, errors} = error;
  return res
    .status(400)
    .render("search", { name, errors });
};

exports.searchUsernameGet = [
  validateName,
  async (req, res, next) => {
    const { name } = req.query;
    if (!name) return res.status(200).render("search");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.errors = errors.array();
      error.name = name;
      next(error);
    }

    const results = await UsersStorage.getUsersByName({ name });

    return res.status(200).render("search", { name, results });
  },
  errorHandler
];

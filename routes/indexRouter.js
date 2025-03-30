const { Router } = require("express");

const UsersStorage = require("../models/UsersStorage");

const router = Router();

router.use("/", async (req, res) => {
  res.render("index", {
    title: "Hello world",
    users: await UsersStorage.getUsers(),
  });
});

module.exports = router;

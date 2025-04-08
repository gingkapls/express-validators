const { Router } = require("express");

const { searchUsernameGet, errorHandler } = require("../controllers/searchController");

const router = Router();

router.use("/", searchUsernameGet);

module.exports = router;

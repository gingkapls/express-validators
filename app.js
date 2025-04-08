const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const searchRouter = require("./routes/searchRouter");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/search", searchRouter);
app.use("/user", userRouter);
app.use("/", indexRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} at http://localhost:${PORT}`)
});

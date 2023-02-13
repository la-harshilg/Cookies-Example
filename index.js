const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const authRouter = require("./routes/auth.routes");
const passportsetup = require("./config/passport.config");

const cookieSession = require("cookie-session");
const passport = require("passport");

app.use(express.static(path.join(__dirname, "views")));

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("App listening on PORT 8001.");
});

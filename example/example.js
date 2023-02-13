const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
require("dotenv").config();

const config = {
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.get("/", (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;
  // res.send(`You are visited ${req.session.views} times.`);
  res.send(
    `Max Age of Session is ${
      req.sessionOptions.maxAge / (1000 * 60 * 60)
    } hr(s)`
  );
});

app.listen(8000, () => {
  console.log("App listening on PORT 8080.............");
});

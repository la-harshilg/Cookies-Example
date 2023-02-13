const authRouter = require("express").Router();
const path = require("path");
const passport = require("passport");

authRouter.get("/login", (req, res) => {
  console.log("/login");
  res.sendFile(path.join(__dirname, "..", "views", "login.html"));
});

authRouter.get("/logout", (req, res) => {
  console.log("/logout");
  req.logout();
  res.redirect("/auth/login");
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"], //What info we want
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/");
  }
);

module.exports = authRouter;

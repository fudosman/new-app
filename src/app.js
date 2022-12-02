const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const routes = require("./routes");
const error404 = require("./errors/error404");
const docs = require("./documentations/docs");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./services/google.passport');

// log all requests
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);
app.use(morgan("tiny"));

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get("/", (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
});

// Auth
app.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Auth Callback
app.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);

// Success
app.get("/auth/callback/success", (req, res) => {
  if (!req.user) res.redirect("/auth/callback/failure");
  res.send("Welcome " + req.user.email);
});

// failure
app.get("/auth/callback/failure", (req, res) => {
  res.send("Error");
});
app.get("/docs", docs);
app.use("/api/", routes);
app.use("*", error404);

module.exports = app;

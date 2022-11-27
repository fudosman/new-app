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

// routes
app.get("/docs", docs);
app.use("/api/", routes);
app.use("*", error404);

module.exports = app;

const express = require('express');
const app = express();
const routes = require('./routes');
const error404 = require('./errors/error404');
const docs = require('./documentations/docs');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// routes
app.get("/docs", docs);
app.use("/api/", routes);
app.use("*", error404);

module.exports = app;
const express = require('express');
const app = express();
const routes = require('./routes');
const error404 = require('./controllers/error404');
const home = require('./controllers/home');
const docs = require('./controllers/docs');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// routes
app.use("/", home);
app.get('/docs', docs);
app.use("/api/v1/", routes);
app.use("**", error404);

module.exports = app;
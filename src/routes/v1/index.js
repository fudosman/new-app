const express = require('express');
const books = require('./books.routes');
const users = require('./user.routes');

const app = express();

app.use('/books', books);
app.use('/users', users);

module.exports = app;
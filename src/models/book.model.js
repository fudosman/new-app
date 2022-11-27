const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "a title must be included"],
  }
}, {
  timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
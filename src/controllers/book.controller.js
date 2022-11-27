const {Book} = require("../models");

module.exports.postBook = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title) {
      return res.status(400).json({
        msg: "Title is required"
      });
    }
    
    const book = new Book(data);
    await book.save();
    return res.status(201).json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.getAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    if(!books) {
      return res.status(404).json({
        msg: "No books found"
      });
    }
    return res.status(200).json(books);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if(!book) {
      return res.status(404).json({
        msg: "Book not found"
      });
    }
    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title} = req.body;
    const book = await Book.findById(id);
    
    if(!book) {
      return res.status(404).json({
        msg: "Book not found"
      });
    }
  
    if(title) {
      book.title = title;
    }
    
    await book.save();
    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if(!book) {
      return res.status(404).json({
        msg: "Book not found"
      });
    }
    
    await book.remove();
    return res.status(200).json({
      msg: "Book deleted"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};
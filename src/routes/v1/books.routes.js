const express = require("express");
const router = express.Router();
const { bookController } = require("../../controllers");

router
  .route("/")
  .post(bookController.postBook)
  .get(bookController.getAllBook);

router
  .route("/:id")
  .get(bookController.getOneBook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;

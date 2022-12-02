const express = require("express");
const router = express.Router();
const service = require('../../services/');
const { bookController } = require("../../controllers");

router.route("/").post(bookController.postBook).get(bookController.getAllBook);

router
  .route("/:id")
  .get(service.jwt.protect,bookController.getOneBook)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;

const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");


router.route("/").post(userController.postUser).get(userController.getAllUsers).put(userController.updateUser).delete(userController.deleteUser);

router.route("/:id").post().get().put().delete();

module.exports = router;

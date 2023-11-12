const express = require("express");
const controller = require("../controller");
const router = express.Router();
const {protect} = require('../middleware/token')

router.get("/getAllUser", protect, controller.userController.getAllUser);
router.post("/createUser", protect, controller.userController.createUser);
router.put("/updateUser", protect, controller.userController.updateUser);
router.delete("/deleteUser", protect, controller.userController.deleteUser);

module.exports = router;
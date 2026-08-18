const express = require("express");
const router = express.Router();
const controller = require("../controllers/topic.controller");

router.get("/", controller.index);
router.get("/:id", controller.index);

module.exports = router;
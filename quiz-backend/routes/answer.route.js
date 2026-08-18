const express = require("express");
const router = express.Router();
const controller = require("../controllers/answer.controller");


router.post("/", controller.createAnswer);
router.get("/:id", controller.index);

module.exports = router;
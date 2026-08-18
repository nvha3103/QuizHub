const express = require("express");
const router = express.Router();
const controller = require("../controllers/test.controller");

router.get("/getTest/:id", controller.getTest)


router.get("/:id", controller.index);
module.exports = router;
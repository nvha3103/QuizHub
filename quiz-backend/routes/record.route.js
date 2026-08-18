const express = require("express");
const controller = require("../controllers/record.controller");
const router = express.Router();
router.post("/", controller.createRecord);
router.get("/:userId", controller.getRecords);

module.exports = router;
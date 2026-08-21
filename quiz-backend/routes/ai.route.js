const express = require("express");
const router = express.Router();
const controller = require("../controllers/ai.controller")
const middleware = require("../middlewares/auth.middleware")

router.post("/explain", controller.explainAnswer);
router.post("/generate-question", middleware.requireAdmin, controller.generateQuestion);
module.exports = router;
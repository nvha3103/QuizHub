const express = require("express");
const router = express.Router();
const controller = require("../controllers/test.controller");
const middleware = require("../middlewares/auth.middleware")
router.get("/getTest/:id", controller.getTest)


router.get("/:id", controller.index);

router.post("/create-with-ai", middleware.requireAdmin, controller.createWithAI)
module.exports = router;
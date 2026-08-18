const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const middlewareAuth = require("../middlewares/auth.middleware");
router.get("/:email", controller.index)
router.post("/register", controller.registerPost);
router.post("/login", controller.loginPost);
router.post("/password/forgot", controller.forgotPassword)
router.post("/password/otp", controller.otpPassword)
router.patch("/password/reset", controller.resetPassword)
router.get("/detail/:id", middlewareAuth.requireAuth, controller.detail)
router.get("/list", middlewareAuth.requireAuth, controller.listUsers)
module.exports = router;

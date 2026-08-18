const userRoutes = require("./user.route");
const topicRoutes = require("./topic.route")
const middlewareAuth = require("../middlewares/auth.middleware");
const testRoutes = require("./test.route")
const questionRoutes = require("./question.route")
const answerRoutes = require("./answer.route")
const recordRoutes = require("./record.route")
module.exports = (app) => {
    app.use("/users", userRoutes)
    app.use("/topics", middlewareAuth.requireAuth, topicRoutes)
    app.use("/tests", middlewareAuth.requireAuth, testRoutes)
    app.use("/records", middlewareAuth.requireAuth, recordRoutes)
    app.use("/questions", middlewareAuth.requireAuth, questionRoutes)
    app.use("/answers", middlewareAuth.requireAuth, answerRoutes)
};


const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        userId: String,
        testId: String,
        answers: Array,
        status: {
            type: String,
            default: "active"
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    {
        timestamps: true
    }
);

const Answer = mongoose.model("Answer", answerSchema, "answers")

module.exports = Answer;

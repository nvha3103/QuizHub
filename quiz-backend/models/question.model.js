const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        testId: String,
        question: String,
        answers: Array,
        correctAnswer: Number,
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

const Question = mongoose.model("Question", questionSchema, "questions")

module.exports = Question;

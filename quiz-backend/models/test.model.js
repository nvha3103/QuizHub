const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        topicId: String,
        listQuestions: Array,
        description: String,
        time: {
            type: Number,
            default: 10
        },
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

const Test = mongoose.model("Test", testSchema, "tests")

module.exports = Test;

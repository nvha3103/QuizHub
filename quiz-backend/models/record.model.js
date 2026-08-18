const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
    {
        userId: String,
        testId: String,
        answerId: String,
        score: Number,
        time: Number
    },
    {
        timestamps: true
    }
);

const Record = mongoose.model("Record", recordSchema, "records")

module.exports = Record;

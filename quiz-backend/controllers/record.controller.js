const Record = require("../models/record.model");
const Test = require("../models/test.model")
const Topic = require("../models/topic.model")
module.exports.createRecord = async (req, res, next) => {
    const record = new Record(req.body);
    const newRecord = await record.save();
    res.status(200).json({
        message: "Record created successfully",
        data: newRecord
    })
}

module.exports.getRecords = async (req, res, next) => {
    const userId = req.params.userId;
    const records = await Record.find({ userId: userId }).lean();
    if (!records) {
        res.status(400).json({
            message: "Records not found",
        })
    }

    await Promise.all(records.map(async (item) => {
        const test = await Test.findOne({ _id: item.testId })
        if (test) {
            item.testName = test.name
            const topic = await Topic.findOne({ _id: test.topicId })
            item.topicName = topic ? topic.name : "None"
        }

    }))
    console.log("records:", records)
    res.status(200).json({
        message: "Records found successfully",
        data: records
    })
}
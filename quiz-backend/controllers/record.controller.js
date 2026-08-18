const Record = require("../models/record.model");
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
    const records = await Record.find({ userId: userId });
    if (!records) {
        res.status(400).json({
            message: "Records not found",
        })
    } else {
        res.status(200).json({
            message: "Records fetched successfully",
            data: records
        })
    }
}
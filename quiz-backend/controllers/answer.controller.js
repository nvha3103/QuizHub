const Answer = require("../models/answer.model")
module.exports.createAnswer = async (req, res) => {
    // console.log("Đã chạy vào đây")

    const newAnswer = new Answer(req.body);
    await newAnswer.save();

    // console.log("newAnswer: ", newAnswer)
    res.json({
        code: 200,
        data: newAnswer
    })
}

module.exports.index = async (req, res) => {
    const answerId = req.params.id
    const data = await Answer.findOne({
        _id: answerId
    })
    console.log("dataAnswer : ", data)
    if (!data) {
        return res.json({
            code: 404,
            message: "Không tìm thấy kết quả"
        })
        return;

    } else {
        res.json({
            code: 200,
            data: data
        })
    }
}
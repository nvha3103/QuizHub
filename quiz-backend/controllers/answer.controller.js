const Answer = require("../models/answer.model")
const Question = require("../models/question.model")

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
    }).lean()

    if (!data) {
        return res.json({
            code: 404,
            message: "Không tìm thấy kết quả"
        })
    }

    const questions = await Question.find({
        testId: data.testId
    }).lean()



    const resultFinal = questions.map(question => {
        const userAnswer = data.answers.find(item => item.questionId == question._id.toString())
        return {
            ...question,
            answer: userAnswer ? userAnswer.answer : "",

        }
    })

    data.resultFinal = resultFinal;

    res.json({
        code: 200,
        data: data,

    })
}
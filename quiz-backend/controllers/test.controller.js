const Test = require("../models/test.model");
const Topic = require("../models/topic.model");
const Question = require("../models/question.model");

module.exports.index = async (req, res) => {
    const id = req.params.id;
    const result = await Test.find({ topicId: id })
    if (result) {
        res.json({ code: 200, data: result })
        return
    } else {
        res.json({ code: 404, data: [], message: "Khong tim thay du lieu" })
        return
    }
}

module.exports.getTest = async (req, res) => {
    const id = req.params.id;
    console.log(`test id :${id}`)
    const result = await Test.findOne({ _id: id })
    console.log(`Lay test theo id: ${id}`, result)
    if (result) {
        res.json({ code: 200, data: result })
        return
    } else {
        res.json({ code: 404, data: [], message: "Khong tim thay du lieu" })
        return
    }
}

module.exports.createWithAI = async (req, res) => {
    try {
        const { testName, topicId, questions, time } = req.body;
        const test = new Test({
            name: testName,
            topicId: topicId,
            time: time
        })

        await test.save()
        const questionsWithTestId = questions.map((question) => {
            question.testId = test._id;
            return question;
        })
        await Question.insertMany(questionsWithTestId)

        res.json({
            code: 200,
            message: "Tao test thanh cong",
            data: test,
            questions: questionsWithTestId
        })
    } catch (error) {
        console.log("err: ", error)
    }
}
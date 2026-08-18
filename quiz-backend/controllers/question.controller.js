const Question = require("../models/question.model");

module.exports.index = async (req, res) => {
    const id = req.params.id;
    // console.log("id-test: ", id)
    const find = {
        testId: id,
    }
    const questions = await Question.find(find);
    // console.log("questions: ", questions)
    if (questions) {
        res.json({
            code: 200,
            data: questions
        })
        return;
    } else {
        res.json({
            code: 404,
            message: "Khong tim thay cau hoi"
        })
        return;

    }
}
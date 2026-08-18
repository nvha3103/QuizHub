const Test = require("../models/test.model");
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
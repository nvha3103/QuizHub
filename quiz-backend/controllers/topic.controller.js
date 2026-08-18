const Topic = require("../models/topic.model")
module.exports.index = async (req, res) => {
    const find = {
        // deleted: false
    }
    if (req.params.id) {
        find._id = req.params.id;
    }
    const topics = await Topic.find(find)
    // console.log("topics: ", topics)
    if (!topics) {
        res.json({
            code: 404,
            message: "Topic not found"
        })
        return;
    }
    res.json({
        code: 200,
        data: topics
    })
}
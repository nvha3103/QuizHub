const User = require("../models/user.model")
module.exports.requireAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        // console.log("token: ", token);
        const user = await User.findOne({ token: token, deleted: false }).select("-password -token -deleted -deletedAt")
        if (!user) {
            res.json({
                code: 401,
                message: "Token kh hop le"
            })
            return;
        }
        req.user = user
        next();
    } else {
        res.json({
            code: 401,
            message: "Vui long gui kem token vao headers"
        })
    }

    // console.log(req.headers.authorization)
}
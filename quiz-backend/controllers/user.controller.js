const User = require("../models/user.model")
const md5 = require("md5");
const generateHelper = require("../models/helpers/generate")
const ForgotPassword = require("../models/forgot-password.model")
const sendMailHelper = require("../helpers/sendMail")

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    if (req.params.email) {
        find.email = req.params.email
    }

    const user = await User.findOne(find);

    if (!user) {
        res.json({
            code: 400,
            message: "Không tồn tại tài khoản"
        })
        return;
    }
    res.json({
        code: 200,
        message: "Lấy thông tin tài khoản thành công",
        user: user
    })
}

module.exports.registerPost = async (req, res) => {
    req.body.password = md5(req.body.password)
    req.body.token = generateHelper.generateRandomString(20)
    try {
        const existUser = await User.findOne({ email: req.body.email, deleted: false })
        if (existUser) {
            res.json({ code: 400, message: "Email đã tồn tại" })
            return;
        }
        const newUser = new User(req.body)
        await newUser.save()
        res.cookie("token", newUser.token)
        res.json({ code: 200, message: "Thêm mới thành công", token: newUser.token })
    } catch (error) {
        res.json({ code: 500, message: "Lỗi hệ thống" })
    }
}

module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email, deleted: false })
        if (!user) {
            res.json({ code: 400, message: "Không tồn tại tài khoản" })
            return;
        }
        if (user.password != md5(password)) {
            res.json({ code: 400, message: "Sai mật khẩu" })
            return;
        }
        res.cookie("token", user.token)
        res.cookie("userId", user._id)
        res.json({ code: 200, message: "Đăng nhập thành công", token: user.token, userId: user._id, role: user.role })
    } catch (error) {
        res.json({ code: 500, message: "Lỗi hệ thống" })
    }
}

module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email: email, deleted: false })

    if (!user) {
        res.json({
            code: 400,
            message: "Không tồn tại tài khoản"
        })
        return;
    }
    const otp = generateHelper.generateRandomNumber(6);
    const timeExpired = 8

    // luu thong tin vao database
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now() + 60 * 1000 * timeExpired
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()

    // gui OTP cho user qua email
    const subject = "Nhận OTP để reset mật khẩu"
    const html = `
    <p>OTP cua ban la ${otp}</p>
    `
    sendMailHelper.sendMail(email, subject, html)

    res.json({
        code: 200,
        message: "Da gui otp qua email"
    })


}

module.exports.otpPassword = async (req, res) => {
    const otp = req.body.otp;
    const email = req.body.email;
    const forgotPassword = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })
    if (!forgotPassword) {
        res.json({
            code: 400,
            message: "OTP khong hop le"
        })
        return;
    }
    const user = await User.findOne({ email: email, deleted: false })
    res.cookie("token", user.token)
    if (forgotPassword.expireAt < Date.now()) {
        res.json({
            code: 400,
            message: "OTP da het han"
        })
        return;
    }
    res.json({
        code: 200,
        message: "Ma OTP hop le",
        otp: otp,
        token: user.token
    })
}

module.exports.resetPassword = async (req, res) => {
    const token = req.cookies.token;
    const user = await User.updateOne({ token: token }, { password: md5(req.body.password) })
    if (!user) {
        res.json({
            code: 400,
            message: "User khong ton tai"
        })
        return;
    }
    res.json({
        code: 200,
        message: "Reset password thanh cong",
    })
}

module.exports.detail = async (req, res) => {
    res.json({
        code: 200,
        message: "Get user details successfully",
        info: req.user
    })
}

module.exports.listUsers = async (req, res) => {
    const users = await User.find({ deleted: false }).select("-password -token -deleted -deletedAt")
    res.json({
        code: 200,
        message: "Get list users successfully",
        users: users
    })
}

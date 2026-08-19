const mongoose = require("mongoose");

// Biến lưu trữ trạng thái kết nối (Dùng cho Serverless)
let isConnected = false;

module.exports.connect = async () => {
    if (isConnected) {
        return; // Nếu đã kết nối rồi thì dùng lại, không tạo thêm
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000, // Đợi tối đa 5s
        });
        isConnected = db.connections[0].readyState;
        console.log("Successfull connected to MongoDB");
    } catch (error) {
        console.log("Failed connected: ", error);
    }
}

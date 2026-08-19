const express = require("express");
require("dotenv").config({ override: true });
const database = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;

// Đảm bảo DB luôn được kết nối trước khi xử lý API (Rất quan trọng cho Vercel)
app.use(async (req, res, next) => {
    await database.connect();
    next();
});

const routes = require("./routes/index.route");

app.use(cookieParser());
app.use(cors());
//parse application/json
app.use(bodyParser.json());


routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;
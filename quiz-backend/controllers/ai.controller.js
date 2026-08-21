const Groq = require("groq-sdk");

module.exports.explainAnswer = async (req, res) => {
    const { question, userAnswer, correctAnswer, allAnswers } = req.body

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `Câu hỏi trắc nghiệm: "${question}"
Các lựa chọn: ${allAnswers.join(", ")}
Đáp án người dùng đã chọn: "${userAnswer}"
Đáp án đúng là: "${correctAnswer}"
Hãy giải thích ngắn gọn trong 2-3 câu bằng tiếng Việt tại sao đáp án của người dùng sai và tại sao "${correctAnswer}" mới là đúng. Không dùng Markdown, chỉ trả về text thuần.`

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
    });

    const explanation = response.choices[0]?.message?.content

    res.json({
        code: 200,
        explaination: explanation || "Không lấy được giải thích"
    })
}

module.exports.generateQuestion = async (req, res) => {
    try {
        const { content, quantity } = req.body;
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const prompt = `Dựa vào đoạn văn sau: ${content}
    Hãy tạo ra ${quantity} câu hỏi trắc nghiệm.
    Trả về DUY NHẤT một mảng JSON hợp lệ, không giải thích thêm,
    theo đúng cấu trúc:
    [{ "question": "...", "answers": ["A","B","C","D"], "correctAnswer": 0 }]
    correctAnswer là số thứ tự (index) của đáp án đúng trong mảng answers.`


        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 3000,
        });

        const quiz = response.choices[0].message.content

        res.json({
            code: 200,
            quiz: quiz
        })
    } catch (error) {
        console.log("error: ", error)
        res.json({
            code: 500,
            message: "Lỗi Server"
        })
    }

}
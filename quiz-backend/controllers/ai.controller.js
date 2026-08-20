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

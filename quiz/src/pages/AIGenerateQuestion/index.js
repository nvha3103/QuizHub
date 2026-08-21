import { useState, useEffect } from "react"
import { getListTopic } from "../../services/topicService"
import { generateQuestion } from "../../services/quizService"
import { createQuestionWithAI } from "../../services/questionsService"
import { useNavigate } from "react-router-dom"
import "./AIGenerateQuestion.scss"

export default function Answer() {
    const [inputText, setInputText] = useState("");
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [topics, setTopics] = useState([]);
    const [testData, setTestData] = useState({
        name: "",
        topicId: "",

    })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic();
            setTopics(response.data)
        }
        fetchApi();
    }, [])

    const handleGenerate = async (e) => {
        e.preventDefault();
        console.log(e.target.elements)
        const content = e.target.elements[0].value
        const quantity = e.target.elements[1].value

        const response = await generateQuestion({
            content: content,
            quantity: quantity
        })
        console.log("response: ", JSON.parse(response.quiz))

        setGeneratedQuiz(JSON.parse(response.quiz))
    }

    const handleInputChange = (e) => {
        setTestData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleConfirmCreate = async (e) => {
        e.preventDefault();
        console.log("e la", e)
        const topicId = e.target.elements["topicId"].value
        console.log("topicId la:", topicId)
        const name = e.target.elements["name"].value;
        console.log("name la: ", name)
        const time = e.target.elements["time"].value;
        console.log("time la: ", time)
        const object = {
            testName: testData.name,
            topicId: testData.topicId,
            questions: generatedQuiz,
            time: testData.time
        }

        const response = await createQuestionWithAI(object)
        console.log("response: ", response)
        if (response.code == 200) {
            alert("Tạo bài thi thành công")
        }

        navigate("/")

    }

    return (
        <div className="ai-generate">
            {
                generatedQuiz === null ? (
                    <div className="ai-generate__step1">
                        <h2>Tạo câu hỏi bằng AI 🤖</h2>
                        <p>Dán đoạn văn bản (bài báo, kiến thức) vào bên dưới, AI sẽ tự động đọc hiểu và sinh ra các câu hỏi trắc nghiệm cho bạn.</p>
                        <form className="ai-generate__form" onSubmit={handleGenerate}>
                            <textarea className="ai-generate__textarea" placeholder="Nhập nội dung văn bản tại đây..." name="content" required></textarea>
                            <input className="ai-generate__input" type="number" placeholder="Số câu hỏi muốn tạo (VD: 5)" name="number" value={testData.number} onChange={handleInputChange} min="1" max="20" required></input>
                            <button className="ai-generate__button" type="submit" disabled={isGenerating}>
                                {isGenerating ? "⏳ Đang phân tích và tạo câu hỏi..." : "✨ Bắt đầu tạo câu hỏi"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="ai-generate__step2">
                        <h2>Review bộ câu hỏi AI đã tạo ✨</h2>
                        <div className="ai-generate__preview">
                            {generatedQuiz.map((question, index) => (
                                <div key={index}>
                                    <p><strong>Câu {index + 1}:</strong> {question.question}</p>
                                    {question.answers.map((answer, index) => (
                                        <p style={{ color: index === question.correctAnswer ? "green" : "black" }}>{index === question.correctAnswer ? "✅" : "❌️"}{answer}</p>
                                    ))}
                                </div>
                            ))}

                        </div>

                        <form className="ai-generate__confirm-form" onSubmit={handleConfirmCreate}>
                            <h3>Lưu bộ câu hỏi thành Bài thi mới</h3>
                            <div className="ai-generate__form-group">
                                <input className="ai-generate__input" type="text" placeholder="Nhập tên bài thi (VD: Bài test Lịch Sử 15p)" name="name" onChange={handleInputChange} required></input>
                                <select className="ai-generate__select" name="topicId" value={testData.topicId} onChange={handleInputChange} required>
                                    <option value="">-- Chọn chủ đề --</option>
                                    {topics.map((topic) => (
                                        <option key={topic._id} value={topic._id}>
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>
                                <input className="ai-generate__input" type="number" placeholder="Thời gian làm bài (VD: 10p)" name="time" onChange={handleInputChange} required></input>
                            </div>

                            <div className="ai-generate__actions">
                                <button className="ai-generate__button ai-generate__button--outline" type="button" onClick={() => setGeneratedQuiz(null)}>🔄 Bỏ qua & Tạo lại</button>
                                <button className="ai-generate__button" type="submit">💾 Xác nhận tạo bài thi</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
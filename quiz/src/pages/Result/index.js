import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAnswer, explainAnswer } from "../../services/answersService"
import { getListQuestion } from "../../services/questionsService"
import { useNavigate } from "react-router-dom";
import { createRecord } from "../../services/recordService";
import "./Result.scss"

export default function Result() {
    const params = useParams()
    const [dataResult, setDataResult] = useState([])
    const [trueAns, setTrueAns] = useState(0)
    const [totalQues, setTotalQues] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [explainationText, setExplainationText] = useState("")
    const [isLoadingAI, setIsLoadingAI] = useState(false)
    const [activeExplainId, setActiveExplainId] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        const fetchApi = async () => {
            const dataAnswers = await getAnswer(params.id);


            const resultFinal = dataAnswers.data.resultFinal;
            let correctAnswer = 0;
            if (resultFinal) {
                for (let i = 0; i < resultFinal.length; i++) {
                    if (String(resultFinal[i].answer) === String(resultFinal[i].correctAnswer)) {
                        correctAnswer += 1;
                    }
                }
            }

            console.log("resultFinal :", resultFinal)

            setTrueAns(correctAnswer);
            setTotalQues(resultFinal.length);
            setDataResult(resultFinal);
            setIsLoading(false);

            const options = {
                userId: dataAnswers.data.userId,
                testId: dataAnswers.data.testId,
                answerId: params.id,
                score: Math.round(correctAnswer / resultFinal.length * 10),
                time: dataAnswers.data.time,
            }
            createRecord(options).catch(err => console.log("Lỗi lưu lịch sử", err));
        }
        fetchApi()
    }, [])


    const onClick = () => {
        navigate(-1);
    }

    const handleAskAI = async (item) => {
        //Đánh dấu câu cần được giải thích
        setActiveExplainId(item._id)
        setIsLoadingAI(true)
        // Xóa đi các giải thíc cũ(nếu đã có câu yêu cầu giải thích rồi)
        setExplainationText("")

        //Chuyển câu trả lời đúng và câu trả lời của nguoi dùng sang text
        const userAnswerText = item.answers[item.answer];
        const correctAnswerText = item.answers[item.correctAnswer];

        const result = await explainAnswer({
            question: item.question,
            userAnswer: userAnswerText,
            correctAnswer: correctAnswerText,
            allAnswers: item.answers
        })

        console.log("Kết quả giải thích của AI: ", result)

        setExplainationText(result.explaination)
        setIsLoadingAI(false)

    }

    return (
        <>
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    <h1>Ket qua: {trueAns} / {totalQues}</h1>

                    <div className="result__list"></div>
                    {dataResult.map((item, index) => (
                        <div className="result__item" key={item.id}>

                            <p>Cau {index + 1}: {item.question}
                                {String(item.correctAnswer) === String(item.answer) ? (
                                    <span className="result__tag result__tag--true">Đúng</span>
                                ) : (
                                    <>
                                        <span className="result__tag result__tag--false">Sai</span>
                                        <button
                                            onClick={() => handleAskAI(item)}
                                            disabled={isLoadingAI && activeExplainId === item._id}
                                        >
                                            {isLoadingAI && activeExplainId === item._id
                                                ? "🤖 Đang suy luận.."
                                                : "🤖 Giaỉ thích chi tiết"}
                                        </button>
                                    </>
                                )}
                            </p>

                            {activeExplainId === item._id && explainationText && (
                                <div className="ai_explaination">
                                    <p><strong>Giaỉ thích</strong></p>
                                    <p>{explainationText}</p>
                                    <button onClick={() => {
                                        setActiveExplainId(null)
                                        setExplainationText("")
                                    }}>X</button>
                                </div>
                            )}


                            {item.answers.map((itemAns, indexAns) => {
                                let className = "";
                                let checked = false;

                                if (String(item.answer) === String(indexAns)) {
                                    checked = true;
                                    className = "result__item--selected"
                                }

                                if (String(item.correctAnswer) === String(indexAns)) {
                                    className += " result__item--result"
                                }
                                return (
                                    <div className="form-quiz__answer" key={indexAns}>
                                        <input type="radio" checked={checked} disabled />
                                        <label className={className}>{itemAns}</label>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                    <button onClick={onClick}>Làm lại</button>
                </>
            )}
        </>
    )
}
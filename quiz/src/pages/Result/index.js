import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAnswer } from "../../services/answersService"
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
    const navigate = useNavigate()
    useEffect(() => {
        const fetchApi = async () => {
            const dataAnswers = await getAnswer(params.id);


            const resultFinal = dataAnswers.data.resultFinal;
            console.log("resultFinal :", resultFinal)
            let correctAnswer = 0;
            if (resultFinal) {
                for (let i = 0; i < resultFinal.length; i++) {
                    if (String(resultFinal[i].answer) === String(resultFinal[i].correctAnswer)) {
                        correctAnswer += 1;
                    }
                }
            }


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
                                    <span className="result__tag result__tag--false">Sai</span>
                                )}
                            </p>


                            {item.answers.map((itemAns, indexAns) => {
                                let className = "";
                                let checked = false;

                                if (item.answer === indexAns) {
                                    checked = true;
                                    className = "result__item--selected"
                                }

                                if (item.correctAnswer === indexAns) {
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
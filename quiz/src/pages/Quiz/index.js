import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTopic } from "../../services/topicService"
import { getListQuestion } from "../../services/questionsService"
import { getCookie } from "../../helper/cookie"
import { createAnswer } from "../../services/quizService"
import "./index.scss"
import { getTest } from "../../services/testService"
export default function Quiz() {
    const params = useParams(); //de lay duoc params tren url
    const [dataTopic, setDataTopic] = useState([])
    const [dataQuestion, setDataQuestion] = useState([])
    const [timeLeft, setTimeLeft] = useState(null)
    const navigate = useNavigate()
    const [selectedAnswers, setSelectedAnswers] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTest(params.id);
            setTimeLeft(response.data.time * 60)
        }
        fetchApi();
    }, [params.id])

    useEffect(() => {
        if (timeLeft === null) return;
        if (timeLeft <= 0) {
            handleSubmit();
        }
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1)
        }, 1000)
        return () => clearInterval(timerId)
    }, [timeLeft])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTopic(params.id);
            setDataTopic(response)
        }
        fetchApi();
    }, [params.id])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListQuestion(params.id);
            console.log("data question: ", response.data)
            setDataQuestion(response.data)
        }
        fetchApi();
    }, [params.id])


    const handleSubmit = async () => {

        // console.log("selectedAnswer: ", selectedAnswers)
        let options = {
            userId: localStorage.getItem("token"),
            testId: params.id,
            answers: selectedAnswers
        }

        const response = await createAnswer(options);
        // console.log("resonse data la: ", response.data)
        if (response.data) {
            navigate(`/result/${response.data._id}`)
        }
    }

    const handleChangeAnswer = (e) => {
        const { name, value } = e.target;
        if (selectedAnswers.find(item => item.name === name)) {
            const updatedAnswers = selectedAnswers.map(item => {
                if (item.name === name) {
                    return { ...item, answer: value }
                }
                return item
            })
            setSelectedAnswers(updatedAnswers)
        } else {
            setSelectedAnswers([...selectedAnswers, { questionId: name, answer: value }])
        }
    }

    const formatTime = (totalSeconds) => {
        if (totalSeconds == null) return
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;

    }

    return (
        <>
            <h2>Bài thi: {dataTopic && (<>{dataTopic.name}</>)}</h2>
            
            <div className={`quiz-timer ${timeLeft !== null && timeLeft <= 60 ? 'warning' : ''}`}>
                <span className="icon">⏳</span>
                <div className="time-info">
                    <span className="label">Thời gian còn lại</span>
                    <strong className="time">{formatTime(timeLeft)}</strong>
                </div>
            </div>
            <div className="form-quiz">
                <form onSubmit={handleSubmit}>
                    {dataQuestion.map((item, index) => (
                        <div className="form-quiz__item" key={item.id}>
                            <p>Cau {index + 1}: {item.question} </p>
                            {item.answers.map((itemAns, indexAns) => (
                                <div className="form-quiz__answer" key={indexAns}>
                                    <input type="radio" name={item._id} value={indexAns} id={`quiz-${item._id}-${indexAns}`} onChange={handleChangeAnswer} />
                                    <label htmlFor={`quiz-${item._id}-${indexAns}`}>{itemAns}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit">Nộp bài</button>
                </form>
            </div>
        </>
    )
}

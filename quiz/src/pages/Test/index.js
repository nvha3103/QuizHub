import "./index.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getListTest } from "../../services/testService"
import { getTopic } from "../../services/topicService"
import { Link } from "react-router-dom"
export default function Test() {
    const params = useParams();
    const [topic, setTopic] = useState('')
    const [tests, setTests] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTest(params.id);
            console.log("list tests: ", response.data)
            setTests(response.data)
            setIsLoading(false);
        }
        const topicRender = async () => {
            const res = await getTopic(params.id)
            setTopic(res.data[0].name);
        }
        topicRender();
        fetchApi();
    }, [])
    return (
        <>
            <h2>Các bài test cho chủ đề {topic} </h2>
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                <div className="list-test">
                    {tests.map((test, index) => (
                        <div key={index} className="box-test">
                            <h4>{test.name}</h4>
                            <p>{test.description}</p>
                            <button>
                                <Link to={`/quiz/${test._id}`}>
                                    Thi ngay
                                </Link>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
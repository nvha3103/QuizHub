import { useState, useEffect } from "react"
import { getAnswersByUserId } from "../../services/answersService"
import { getTopic } from "../../services/topicService"
import { getCookie } from "../../helper/cookie"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getRecords } from "../../services/recordService"
import { getTest } from "../../services/testService"
import "./index.css"

export default function Answer() {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchApi = async () => {
            const userId = localStorage.getItem("userId");
            const result = await getRecords(userId)
            setRecords(result.data);
            setIsLoading(false);
        }
        fetchApi();
    }, [])



    return (
        <>
            <h2>Danh sach bai da luyen tap</h2>

            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                records.length > 0 && (
                <table className="tbl">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên chủ đề</th>
                        <th>Tên Test</th>
                        <th>Điểm số</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>

                            <td>{item.topicName}</td>
                            <td>{item.testName}</td>
                            <td>{item.score}</td>
                            <td>
                                <Link to={"/result/" + item.answerId}>Xem chi tiet</Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
                )
            )}
        </>
    )
}
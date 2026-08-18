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
    const params = useParams();
    const userId = localStorage.getItem("userId")
    useEffect(() => {
        console.log("userId", userId);

        const fetchApi = async () => {
            const result = await getRecords(userId);
            console.log("records", result);

            if (result && result.data) {

                const finalRecords = await Promise.all(
                    result.data.map(async (item) => {
                        const test = await getTest(item.testId);
                        const topicId = test.data.topicId;
                        const topic = await getTopic(topicId);

                        // Trả về object mới đã được gộp thêm testName và topicName
                        return {
                            ...item,
                            testName: test.data.name,
                            topicName: topic.data[0]?.name || topic.data.name
                        };
                    })
                );

                console.log("newRecords", finalRecords);
                setRecords(finalRecords);
            }
        }
        fetchApi();
    }, [])



    return (
        <>
            <h2>Danh sach bai da luyen tap</h2>

            {/* {dataAnswer.length > 0 && ( */}
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
            {/* )} */}
        </>
    )
}
import { getListTopic } from "../../services/topicService"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./index.css"

export default function Topic() {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic()
            console.log("response: ", response.data)
            if (response.data) {
                console.log("topíc: ", response.data)
                setTopics(response.data);
            } else {
                setTopics([])
            }
            setIsLoading(false); // Gọi API xong thì tắt loading
        }

        fetchApi();
    }, [])

    return (
        <>
            <h2>Danh sách chủ đề</h2>

            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                topics.length > 0 && (
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ten chủ đề</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={`/test/${item._id}`}>Danh sách đề</Link>
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
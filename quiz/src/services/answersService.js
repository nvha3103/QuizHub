import { get } from "../utils/request"
import { getCookie } from "../helper/cookie"

export const getAnswersByUserId = async () => {
    const userId = getCookie("id")
    const result = await get(`answers?userId=${userId}`);
    return result;
}

export const getAnswer = async (answerId) => {
    const result = await get(`answers/${answerId}`);
    return result;
}
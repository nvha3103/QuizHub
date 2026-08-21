import { get, post } from "../utils/request"
export const getListQuestion = async (id) => {
    const result = await get(`questions/${id}`);
    return result;
}

export const createQuestionWithAI = async (options) => {
    const result = await post(`tests/create-with-ai`, options);
    return result;
}

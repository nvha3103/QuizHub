import { get, post } from "../utils/request"
export const getListQuestion = async (id) => {
    const result = await get(`questions/${id}`);
    return result;
}

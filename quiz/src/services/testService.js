import { get, post } from "../utils/request"

export const getListTest = async (id) => {
    const result = await get(`tests/${id}`);
    return result;
}

export const getTest = async (testid) => {
    const result = await get(`tests/getTest/${testid}`);
    return result;
}
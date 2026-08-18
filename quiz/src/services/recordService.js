import { get, post } from "../utils/request"

export const createRecord = async (options) => {
    const result = await post("records", options)
    return result
}

export const getRecords = async (userId) => {
    const result = await get(`records/${userId}`)
    return result
}
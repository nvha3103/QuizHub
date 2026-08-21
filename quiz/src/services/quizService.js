import { post } from "../utils/request"

export const createAnswer = async (options) => {
    const result = await post("answers", options)
    return result
}

export const generateQuestion = async (options) => {
    const result = await post("ai/generate-question", options)
    return result
}
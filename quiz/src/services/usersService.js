import { get, post } from "../utils/request"

export const login = async (email, password) => {
    const result = await post(`users/login`, { email, password });
    return result;
}

export const register = async (options) => {
    const result = await post('users/register', options);
    return result;
}

export const resetPassword = async (options) => {
    const result = await get(`users/password/reset`, options);
    return result;
}

export const getListUsers = async () => {
    const result = await get(`users/list`);
    return result;
}

export const checkExits = async (key, value) => {
    const result = await get(`users/${value}`);
    return result;
}


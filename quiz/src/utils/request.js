// const API_DOMAIN = "http://localhost:3001/"
const API_DOMAIN = "https://quiz-hub-rbpr.vercel.app/"
const getToken = () => {
    const token = localStorage.getItem("token")
    return token ? `Bearer ${token}` : ""
}

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "authorization": getToken()
        }
    })
    const result = await response.json();
    return result;
}

export const post = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(options)
    })

    const result = response.json();
    return result;
}

export const patch = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(options)
    })

    const result = response.json();
    return result;
}

export const del = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    })

    const result = await response.json()
    return result
}
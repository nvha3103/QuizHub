import { useNavigate } from "react-router-dom"
import { deleteAllCookies } from "../../helper/cookie"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkLogin } from "../../actions/login"
export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    deleteAllCookies();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    useEffect(() => {
        dispatch(checkLogin(false))
        navigate("/login")
    }, [])
    return (<>

    </>)
}
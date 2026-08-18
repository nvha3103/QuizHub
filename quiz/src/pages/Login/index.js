import { login } from "../../services/usersService"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../../helper/cookie"
import { useDispatch } from "react-redux"
import { checkLogin } from "../../actions/login"
import "./index.css"
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const response = await login(email, password);
        if (response.code == 200) {
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("token", response.token);
            dispatch(checkLogin(true))
            navigate("/")
        } else {
            alert("Sai tai khoan hoac mat khau");
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <h2>Login Quiz</h2>
                <div>
                    <input type="email" placeholder="Nhap email"></input>
                </div>
                <div>
                    <input type="password" placeholder="Nhap mat khau"></input>
                </div>
                <button type="submit">Login</button>

            </form>
        </>
    )
}
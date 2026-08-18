import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react"
import { register, checkExits } from "../../services/usersService"
import { generateToken } from "../../helper/generateToken"
import "./index.css"
export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        const checkExitEmail = await checkExits("email", email)

        // console.log(checkExitEmail)
        if (checkExitEmail.code == 200) {
            alert("Email da ton tai!")
        } else {
            const options = {
                fullName: fullName,
                email: email,
                password: password,
                token: generateToken()
            }

            const response = await register(options)
            if (response) {
                navigate("/login")
            } else {
                alert("Dang ki that bai")
            }

        }


    }
    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <h2>Register</h2>
                <div>
                    <input type="fullName" placeholder="Nhap ho ten"></input>
                </div>
                <div>
                    <input type="email" placeholder="Nhap email"></input>
                </div>
                <div>
                    <input type="password" placeholder="Nhap mat khau"></input>
                </div>
                <button type="submit">Register</button>

            </form>
        </>
    )
}
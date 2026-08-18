import "./LayoutDefault.scss"
import { NavLink, Outlet } from "react-router-dom";
import { getCookie } from "../../helper/cookie"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { checkLogin } from "../../actions/login"

export default function LayoutDefault() {
    const isLogin = useSelector(state => state.loginReducer);

    const [token, setToken] = useState(localStorage.getItem("token"));

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(checkLogin(true));
        }
    }, [dispatch]);

    useEffect(() => {
        const currentToken = localStorage.getItem("token");
        setToken(currentToken);
    }, [isLogin]);

    return (
        <>
            <div className="layout-default">
                <header className="layout-default__header">
                    <div className="layout-default__logo">
                        <img src="https://img.pikbest.com/illustration/20241220/simple-black-and-white-mountain-logo-design-vector-_11276493.jpg!w700wp"></img>
                        <span>QuizzHub</span>
                    </div>
                    <div className="menu">
                        <ul>
                            <li>
                                <div className="menu__box">
                                    <NavLink to="/">Home</NavLink>
                                </div>

                            </li>

                            {isLogin && (
                                <>
                                    <li>
                                        <div className="menu__box">
                                            <NavLink to="/topic">
                                                Topic</NavLink>
                                        </div>

                                    </li>

                                    <li>
                                        <div className="menu__box">
                                            <NavLink to="/answers">Answers</NavLink>
                                        </div>
                                    </li>
                                </>
                            )}


                        </ul>
                    </div>
                    <div className="layout-default__account">
                        {isLogin ? (<>
                            <NavLink to="/logout">
                                <p className="btn__logout">Đăng xuất</p>
                            </NavLink>

                        </>) : (<>

                            <NavLink to="/login"> <p className="btn__login">Đăng nhập</p></NavLink>
                            <NavLink to="/register"> <p className="btn__register">Đăng kí</p></NavLink>


                        </>)}

                    </div>
                </header>
                <main className="layout-default__main">
                    <Outlet />
                </main>
                <footer className="layout-default__footer"> I
                    Copyright @ 2026 by NVH
                </footer>
            </div>

        </>
    )
}
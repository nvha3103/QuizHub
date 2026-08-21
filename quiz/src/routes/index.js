import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home";
import Register from "../pages/Register"
import Login from "../pages/Login"
import PrivateRoutes from "../components/PrivateRoutes"
import Answers from "../pages/Answers"
import Quiz from "../pages/Quiz"
import Topic from "../pages/Topic"
import Result from "../pages/Result"
import LayoutDefault from "../layout/LayoutDefault"
import Logout from "../pages/Logout"
import Test from "../pages/Test"
import AIGenerateQuestion from "../pages/AIGenerateQuestion";
export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {

                path: "logout",
                element: <Logout />
            },
            {

                element: <PrivateRoutes />,
                children: [
                    {
                        path: "ai-generate-question",
                        element: <AIGenerateQuestion />
                    },
                    {
                        path: "answers",
                        element: <Answers />
                    },
                    {
                        path: "test/:id",
                        element: <Test />
                    },
                    {
                        path: "quiz/:id",
                        element: <Quiz />
                    },
                    {
                        path: "topic",
                        element: <Topic />
                    },
                    {
                        path: "result/:id",
                        element: <Result />
                    },
                ]
            }
        ]
    }

]

{/* <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} >
            <Route index element={<BlogAll />} />
            <Route path="news" element={<BlogNews />} />
            <Route path="related" element={<BlogRelated />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>


          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error404 />} />

          <Route element={<PrivateRoutes />}>
            <Route path="info-user" element={<InfoUser />} />
          </Route>
          {/* * dai dien cho cac trang ch duoc dinh nghia */}
//     </Route >

//   </Routes > */}
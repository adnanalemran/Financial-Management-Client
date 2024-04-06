import { createBrowserRouter } from "react-router-dom";
import Signin from "../Pages/Auth/Signin";
import SignUp from "../Pages/Auth/SignUp";
const router = createBrowserRouter([
    {
        path: "/",
        element: "login",
    },


    {
        path: "/signIn",
        element: <Signin/>,
    },  {
        path: "/signUp",
        element: <SignUp/>,
    },
]);

export default router;

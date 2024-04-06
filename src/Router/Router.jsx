import { createBrowserRouter } from "react-router-dom";
import Signin from "../Pages/Auth/Signin";
import SignUp from "../Pages/Auth/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element:
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>,
    },

    {
        path: "/signIn",
        element: <Signin />,
    }, {
        path: "/signUp",
        element: <SignUp />,
    },
]);

export default router;

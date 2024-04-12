import { createBrowserRouter } from "react-router-dom";
import Signin from "../Pages/Auth/Signin";
import SignUp from "../Pages/Auth/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/Profile";
import Cost from "../components/Cost";
const router = createBrowserRouter([
    {
        path: "/",
        element:
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>,
        children: [
            {
                path: '/profile',
                element: <Profile/>
            },
            {
                path: '/cost',
                element: <Cost/>
            }
        ]
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

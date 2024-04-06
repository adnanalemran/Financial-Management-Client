import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: "login",
    },
    {
        path: "/signIn",
        element: "login",
    },
]);

export default router;

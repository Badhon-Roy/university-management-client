import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerator";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>
    },
    // admin related routes
    {
        path : "/admin",
        element : <App/>,
        children : routeGenerator(adminPaths)
    },
    // faculty related routes
    {
        path : "/faculty",
        element : <App/>,
        children :routeGenerator(facultyPaths)
    },
    // student related routes
    {
        path : "/student",
        element : <App/>,
        children :routeGenerator(studentPaths)
    },
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    },
])

export default router;
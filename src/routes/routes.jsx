import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Lessons from "../pages/Users/Lessons";
import Tutorials from "../pages/Users/Tutorials";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import LessonDetails from "../pages/Users/LessonDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/register", element: <Registration /> },
      { path: "/login", element: <Login /> },
      {
        path: "/lessons",
        element: <Lessons />,
      },
      {
        path: "/lessons/:id",
        element: <LessonDetails />,
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
    ],
  },
]);

export default router;

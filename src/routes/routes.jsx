import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Lessons from "../pages/Users/Lessons";
import Tutorials from "../pages/Users/Tutorials";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import LessonDetails from "../pages/Users/LessonDetails";
import AdminPanel from "../pages/AdminPages/AdminPanel";
import ModifyLesson from "../pages/AdminPages/Lessons/ModifyLesson";
import AddLesson from "../pages/AdminPages/Lessons/AddLesson";
import AddVocabulary from "../pages/AdminPages/Vocabularies/AddVocabulary";
import ModifyVocabulary from "../pages/AdminPages/Vocabularies/ModifyVocabulary";
import HomePage from "../pages/Users/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
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
  {
    path: "/admin-panel",
    element: <AdminPanel />,
    children: [
      {
        path: "/admin-panel/manage-lessons/add",
        element: <AddLesson />,
      },
      {
        path: "/admin-panel/manage-lessons/modify",
        element: <ModifyLesson />,
      },
      {
        path: "/admin-panel/manage-vocabularies/add",
        element: <AddVocabulary />,
      },
      {
        path: "/admin-panel/manage-vocabularies/modify",
        element: <ModifyVocabulary />,
      },
    ],
  },
]);

export default router;

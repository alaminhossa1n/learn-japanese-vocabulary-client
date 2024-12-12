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
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import PrivateLoginAndRegi from "./PrivateLoginAndRegi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <UserRoute>
            <HomePage />
          </UserRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PrivateLoginAndRegi>
            <Registration />
          </PrivateLoginAndRegi>
        ),
      },
      {
        path: "/login",
        element: (
          <PrivateLoginAndRegi>
            <Login />
          </PrivateLoginAndRegi>
        ),
      },
      {
        path: "/lessons",
        element: (
          <UserRoute>
            <Lessons />
          </UserRoute>
        ),
      },
      {
        path: "/lessons/:id",
        element: (
          <UserRoute>
            <LessonDetails />
          </UserRoute>
        ),
      },
      {
        path: "/tutorials",
        element: (
          <UserRoute>
            <Tutorials />
          </UserRoute>
        ),
      },
    ],
  },
  {
    path: "/admin-panel",
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
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

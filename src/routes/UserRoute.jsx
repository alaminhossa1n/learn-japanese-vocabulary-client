/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { useCurrentUserQuery } from "../redux/features/auth/authApi";

const UserRoute = ({ children }) => {
  const { data } = useCurrentUserQuery();
  const user = data?.data;

  if (user?.role === "User") {
    return children;
  }

  if (user?.role === "Admin") {
    return <Navigate to="/admin-panel"></Navigate>;
  }
  return <Navigate to="/login"></Navigate>;
};

export default UserRoute;

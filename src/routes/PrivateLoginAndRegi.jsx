/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { useCurrentUserQuery } from "../redux/features/auth/authApi";

const PrivateLoginAndRegi = ({ children }) => {
  const { data } = useCurrentUserQuery();
  const user = data?.data;

  if (!user) {
    return children;
  }

  if (user) {
    if (user.role == "Admin") {
      return <Navigate to={"/admin-panel"}></Navigate>;
    }
    if (user.role == "User") {
      return <Navigate to={"/"}></Navigate>;
    }
  }
};

export default PrivateLoginAndRegi;

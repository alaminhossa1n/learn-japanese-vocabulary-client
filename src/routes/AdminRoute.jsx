/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { useCurrentUserQuery } from "../redux/features/auth/authApi";
import { toast } from "sonner";

const AdminRoute = ({ children }) => {
  const { data } = useCurrentUserQuery();
  const user = data?.data;

  if (user?.role === "Admin") {
    return children;
  }

  if (user?.role === "User") {
    toast.message("You don't have access in Admin Panel.");
    return <Navigate to="/"></Navigate>;
  }
  return <Navigate to="/login"></Navigate>;
};

export default AdminRoute;

/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { useCurrentUserQuery } from "../redux/features/auth/authApi";
import { toast } from "sonner";

const AdminRoute = ({ children }) => {
  const { data, isLoading } = useCurrentUserQuery();
  const user = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user?.role === "Admin") {
    return children;
  }

  toast.error("You don't have access to the Admin Panel.");
  return <Navigate to="/" />;
};

export default AdminRoute;

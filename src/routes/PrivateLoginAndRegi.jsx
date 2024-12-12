/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { useCurrentUserQuery } from "../redux/features/auth/authApi";

const PrivateLoginAndRegi = ({ children }) => {
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
    return children;
  }

  // Redirect based on user role
  if (user.role === "Admin") {
    return <Navigate to="/admin-panel" />;
  }
  if (user.role === "User") {
    return <Navigate to="/" />;
  }

  return null;
};

export default PrivateLoginAndRegi;

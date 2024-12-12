import AdminSidebar from "./AdminSidebar"; // Import the AdminSidebar
import { Outlet } from "react-router-dom"; // To render the nested routes

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

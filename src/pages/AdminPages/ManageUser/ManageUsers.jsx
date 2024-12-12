import { useState } from "react";
import { toast } from "sonner";
import { useCurrentUserQuery, useGetUsersQuery, useUpdateRoleMutation } from "../../../redux/features/auth/authApi";

const ManageUsers = () => {
  const { data, refetch } = useGetUsersQuery();
  const { data: currentUserData } = useCurrentUserQuery();
  const [updateRole] = useUpdateRoleMutation();

  const users = data?.data;
  const currentUser = currentUserData?.data;
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  // Show role update form for a specific user
  const handleEditRole = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
  };

  // Handle role update submission
  const handleUpdateRole = async () => {
    if (currentUser.email === selectedUser.email) {
      toast.error("You cannot change your own role.");
      return;
    }

    try {
      await updateRole({
        id: selectedUser._id,
        role: newRole,
      }).unwrap();
      toast.success("User role updated successfully!");
      setSelectedUser(null);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update role");
    }
  };

  if (!users) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Manage Users
      </h1>

      {/* Edit Role Form */}
      {selectedUser && (
        <div className="bg-white p-6 shadow-md rounded-lg my-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Update Role for {selectedUser.name}
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="User">Normal User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Existing Users
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEditRole(user)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

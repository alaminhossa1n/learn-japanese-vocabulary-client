import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useCurrentUserQuery } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";

const AdminSidebar = () => {
  const [isLessonsOpen, setIsLessonsOpen] = useState(false);
  const [isVocabularyOpen, setIsVocabularyOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const location = useLocation();

  const toggleLessons = () => setIsLessonsOpen(!isLessonsOpen);
  const toggleVocabulary = () => setIsVocabularyOpen(!isVocabularyOpen);
  const toggleUsers = () => setIsUsersOpen(!isUsersOpen);

  const isActive = (path) => location.pathname === path;

  //handle logout

  const dispatch = useAppDispatch();
  const { refetch } = useCurrentUserQuery();
  const handleLogout = () => {
    dispatch(logout());
    refetch();
  };
  return (
    <aside className="w-64 bg-gray-800 text-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        {/* Manage Lessons */}
        <div>
          <button
            onClick={toggleLessons}
            className={`w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition ${
              isLessonsOpen ? "border border-gray-700" : ""
            }`}
          >
            Manage Lessons
          </button>
          {isLessonsOpen && (
            <div className="pl-6 space-y-2">
              <Link
                to="/admin-panel/manage-lessons/add"
                className={`block px-4 py-2 transition ${
                  isActive("/admin-panel/manage-lessons/add")
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Add Lesson
              </Link>
              <Link
                to="/admin-panel/manage-lessons/modify"
                className={`block px-4 py-2 transition ${
                  isActive("/admin-panel/manage-lessons/modify")
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Modify Lesson
              </Link>
            </div>
          )}
        </div>

        {/* Manage Vocabulary */}
        <div>
          <button
            onClick={toggleVocabulary}
            className={`w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition ${
              isVocabularyOpen ? "border border-gray-700" : ""
            }`}
          >
            Manage Vocabularies
          </button>
          {isVocabularyOpen && (
            <div className="pl-6 space-y-2">
              <Link
                to="/admin-panel/manage-vocabularies/add"
                className={`block px-4 py-2 transition ${
                  isActive("/admin-panel/manage-vocabularies/add")
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Add Vocabulary
              </Link>
              <Link
                to="/admin-panel/manage-vocabularies/modify"
                className={`block px-4 py-2 transition ${
                  isActive("/admin-panel/manage-vocabularies/modify")
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Modify Vocabulary
              </Link>
            </div>
          )}
        </div>

        {/* Manage Users */}
        <div>
          <button
            onClick={toggleUsers}
            className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 transition"
          >
            Manage Users
          </button>
          {isUsersOpen && (
            <div className="pl-6 space-y-2">
              <Link
                to="/admin-panel/manage-users"
                className={`block px-4 py-2 transition ${
                  isActive("/admin-panel/manage-users")
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                View Users
              </Link>
              <Link
                to="/admin-panel/manage-users/promote"
                className={`block px-4 py-2 transition ${
                  isActive("/admin-panel/manage-users/promote")
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Promote User
              </Link>
              <Link
                to="/admin-panel/manage-users/demote"
                className={`block px-4 py-2 transition ${
                  isActive("/admin-panel/manage-users/demote")
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Demote User
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

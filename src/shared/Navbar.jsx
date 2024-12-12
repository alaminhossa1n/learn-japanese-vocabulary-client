import { Link } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useCurrentUserQuery } from "../redux/features/auth/authApi";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useCurrentUserQuery();
  const user = data?.data;

  const handleLogout = () => {
    dispatch(logout());
    refetch();
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-xl font-bold text-red-600">日本語 Learn</h1>
            </Link>
          </div>

          {/* Menu for Larger Screens */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/lessons"
              className="text-gray-800 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Lessons
            </Link>
            <Link
              to="/tutorials"
              className="text-gray-800 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Tutorials
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="text-gray-800 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-800 hover:text-red-600 focus:outline-none"
              aria-label="Open menu"
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                menu.classList.toggle("hidden");
              }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/lessons"
            className="block text-gray-800 hover:text-red-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Lessons
          </Link>
          <Link
            to="/tutorials"
            className="block text-gray-800 hover:text-red-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Tutorials
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="text-gray-800 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

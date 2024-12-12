import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../redux/features/auth/authSlice";
import { useSigninMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";

const Login = () => {
  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signin(formData).unwrap();

      if (res.success === true) {
        toast.success("Login Successful");

        if (res.data.user.role === "Admin") {
          navigate("/admin-panel");
        } else if (res.data.user.role === "User") {
          navigate("/");
        }

        dispatch(setToken(res?.data));
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login to 日本語 Learn
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm py-2 pl-2"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm py-2 pl-2"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-red-600 hover:underline hover:text-red-700"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

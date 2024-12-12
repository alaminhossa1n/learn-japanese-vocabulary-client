import { useState } from "react";
import {
  useCurrentUserQuery,
  useSignUpMutation,
} from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Registration = () => {
  const image_Upload_token = import.meta.env.VITE_Image_Upload_token;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_Upload_token}`;
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const [formsData, setFormsData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });

  const [imageData, setImageData] = useState(null);

  const { data } = useCurrentUserQuery();
  const user = data?.data;
  if (user) {
    toast.info("Your are already Logged in");
    if (user.role == "Admin") {
      navigate("/admin-panel");
    }
    if (user.role == "User") {
      navigate("/");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormsData({ ...formsData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setImageData(formData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure image data is set
      if (!imageData) {
        console.error("No image selected for upload.");
        return;
      }

      // Upload the image to ImgBB
      const imgResponse = await fetch(img_hosting_url, {
        method: "POST",
        body: imageData,
      }).then((res) => res.json());

      if (imgResponse.success) {
        const imgURL = imgResponse?.data?.display_url;

        // Add the image URL to the form data
        const updatedFormData = { ...formsData, photo: imgURL };

        // Call signUp function
        const res = await signUp(updatedFormData).unwrap();
        if (res?.success == true) {
          toast.success("Registration Success, Please login.")
          navigate("/login");
        }
      } else {
        console.error("Image upload failed:", imgResponse.error);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register for 日本語 Learn
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formsData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm py-2 pl-2"
            />
          </div>

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
              value={formsData.email}
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
              value={formsData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm py-2 pl-2"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md ${
                isLoading
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;

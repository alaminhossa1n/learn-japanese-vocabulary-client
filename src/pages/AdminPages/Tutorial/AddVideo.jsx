import { useState } from "react";
import { toast } from "sonner";
import { useCreateTutorialMutation } from "../../../redux/features/tutorial.js/tutorialAPi";
import { useCurrentUserQuery } from "../../../redux/features/auth/authApi";

const AddVideo = () => {
  const [createVideo, { isLoading }] = useCreateTutorialMutation();
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    adminEmail: "",
  });

  const { data } = useCurrentUserQuery();
  const user = data?.data;

  if (user) {
    formData.adminEmail = user.email;
  }

  const isValidYouTubeUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return (
        parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtu.be"
      );
    } catch (error) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddVideo = async () => {
    if (!isValidYouTubeUrl(formData.videoUrl)) {
      toast.error("Invalid YouTube URL. Please provide a correct link.");
      return;
    }

    try {
      const response = await createVideo(formData).unwrap();

      if (response.success) {
        toast.success("Video added successfully!");
        setFormData({
          title: "",
          videoUrl: "",
          adminEmail: user.email,
        });
      }
    } catch (error) {
      toast.error(error.data?.message || "Failed to add video");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Add YouTube Video
      </h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add a New Video
        </h2>
        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Video Title
            </label>
            <input
              id="title"
              required
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm py-2 pl-2"
              placeholder="Enter video title"
            />
          </div>

          {/* Video URL Field */}
          <div>
            <label
              htmlFor="videoUrl"
              className="block text-sm font-medium text-gray-700"
            >
              YouTube Video URL
            </label>
            <input
              id="videoUrl"
              required
              type="url"
              value={formData.videoUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm py-2 pl-2"
              placeholder="Enter YouTube video URL"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddVideo}
              className={`px-4 py-2 rounded-md ${
                isLoading
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Video"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;

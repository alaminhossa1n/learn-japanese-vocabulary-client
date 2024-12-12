import { useState } from "react";
import { toast } from "sonner";
import { useDeleteTutorialMutation, useGetAllTutorialQuery } from "../../../redux/features/tutorial.js/tutorialAPi";

const DeleteVideo = () => {
  const { data, refetch } = useGetAllTutorialQuery();
  const [deleteTutorial] = useDeleteTutorialMutation();
  const tutorials = data?.data;

  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Show delete confirmation popup
  const handleDeleteTutorial = (tutorialId) => {
    setDeleteConfirmation(tutorialId);
  };

  // Confirm and delete the tutorial
  const confirmDeleteTutorial = async () => {
    try {
      await deleteTutorial(deleteConfirmation).unwrap();
      toast.success("Video deleted successfully!");
      setDeleteConfirmation(null);
      refetch();
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete the video.");
    }
  };

  if (!tutorials) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-red-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Manage Videos
      </h1>

      {/* Video List */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Existing Videos
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Video URL
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tutorials.map((tutorial) => (
              <tr key={tutorial._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tutorial.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a
                    href={tutorial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {tutorial.videoUrl}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDeleteTutorial(tutorial._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this video?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={confirmDeleteTutorial}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteVideo;

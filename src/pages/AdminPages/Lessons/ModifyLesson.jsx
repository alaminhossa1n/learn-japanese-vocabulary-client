import { useState } from "react";
import {
  useDeleteLessonMutation,
  useGetAllLessonsQuery,
  useUpdateLessonMutation,
} from "../../../redux/features/lessons/lessonApi";
import { toast } from "sonner";

const ModifyLesson = () => {
  const { data, refetch } = useGetAllLessonsQuery();
  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const lessons = data?.data;

  const [editingLesson, setEditingLesson] = useState(null);
  const [formData, setFormData] = useState({
    lessonName: "",
    lessonNumber: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Show edit form with selected lesson data
  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setFormData({
      lessonName: lesson.lessonName,
      lessonNumber: lesson.lessonNumber,
    });
  };

  // Submit the updated lesson
  const handleUpdateLesson = async () => {
    try {
      await updateLesson({
        id: editingLesson._id,
        updatedLesson: {
          _id: editingLesson._id,
          updatedDoc: formData,
        },
      }).unwrap();
      toast("Lesson updated successfully!");
      setEditingLesson(null);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  // Show delete confirmation popup
  const handleDeleteLesson = (lessonId) => {
    setDeleteConfirmation(lessonId);
  };

  // Confirm and delete the lesson
  const confirmDeleteLesson = async () => {
    try {
      await deleteLesson(deleteConfirmation).unwrap();
      toast("Lesson deleted successfully!");
      setDeleteConfirmation(null);
      refetch();
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  if (!lessons) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Manage Lessons
      </h1>

      {/* Edit Lesson Form */}
      {editingLesson && (
        <div className="bg-white p-6 shadow-md rounded-lg my-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Lesson
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="lessonName"
                className="block text-sm font-medium text-gray-700"
              >
                Lesson Name
              </label>
              <input
                id="lessonName"
                name="lessonName"
                type="text"
                value={formData.lessonName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2"
              />
            </div>
            <div>
              <label
                htmlFor="lessonNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Lesson Number
              </label>
              <input
                id="lessonNumber"
                name="lessonNumber"
                type="number"
                value={formData.lessonNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingLesson(null)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLesson}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Update Lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lessons List */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Existing Lessons
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Lesson Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Lesson Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lesson.lessonName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lesson.lessonNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEditLesson(lesson)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
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
              Are you sure you want to delete this lesson?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={confirmDeleteLesson}
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

export default ModifyLesson;

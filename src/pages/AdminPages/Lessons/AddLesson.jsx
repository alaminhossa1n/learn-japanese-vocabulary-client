import { useState } from "react";
import { toast } from "sonner";
import { useCreateLessonMutation } from "../../../redux/features/lessons/lessonApi";
import { useCurrentUserQuery } from "../../../redux/features/auth/authApi";

const AddLesson = () => {
  const [createLesson, { isLoading }] = useCreateLessonMutation();
  const [formData, setFormData] = useState({
    lessonName: "",
    lessonNumber: "",
    adminEmail: "",
  });

  const { data } = useCurrentUserQuery();
  const user = data?.data;
  if (user) {
    formData.adminEmail = user.email;
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddLesson = async () => {
    try {
      const response = await createLesson(formData).unwrap();

      if (response.success) {
        toast.success("Lesson added successfully!");
        setFormData({
          lessonName: "",
          lessonNumber: "",
          vocabularyCount: "",
        });
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Manage Lessons
      </h1>

      {/* Add/Edit Lesson Form */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Lesson
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
              required
              id="lessonName"
              type="text"
              value={formData.lessonName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm py-2 pl-2"
              placeholder="Enter lesson name"
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
              required
              type="number"
              value={formData.lessonNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm py-2 pl-2"
              placeholder="Enter lesson number"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddLesson}
              className={`px-4 py-2 rounded-md ${
                isLoading
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Lesson"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;

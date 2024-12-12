import { useState } from "react";

const ModifyVocabulary = () => {
  const [lessons, ] = useState([
    { id: 1, name: "Basic Greetings", number: 1, vocabularyCount: 5 },
    { id: 2, name: "Numbers", number: 2, vocabularyCount: 4 },
    { id: 3, name: "Common Phrases", number: 3, vocabularyCount: 6 },
    { id: 4, name: "Time and Date", number: 4, vocabularyCount: 3 },
  ]);

  // Handle deleting a lesson
  const handleDeleteLesson = () => {};

  // Handle editing a lesson
  const handleEditLesson = () => {};

  // Handle updating the edited lesson
//   const handleUpdateLesson = () => {};

  return (
    <div>
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
                Vocabulary Count
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lesson.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lesson.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lesson.vocabularyCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEditLesson(lesson.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
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
    </div>
  );
};

export default ModifyVocabulary;

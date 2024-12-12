const AddLesson = () => {
  // Handle adding a new lesson
  const handleAddLesson = () => {};

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
              id="lessonName"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter lesson number"
            />
          </div>

          <div>
            <label
              htmlFor="vocabularyCount"
              className="block text-sm font-medium text-gray-700"
            >
              Vocabulary Count
            </label>
            <input
              id="vocabularyCount"
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter vocabulary count"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddLesson}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Add Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;

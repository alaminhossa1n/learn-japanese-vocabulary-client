const lessons = [
  { id: 1, name: "Basic Greetings", number: 1 },
  { id: 2, name: "Numbers", number: 2 },
  { id: 3, name: "Common Phrases", number: 3 },
  { id: 4, name: "Time and Date", number: 4 },
];

const Lessons = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Japanese Lessons
        </h1>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-red-600 mb-4">
                {lesson.name}
              </h2>
              <p className="text-gray-700">
                Lesson Number:{" "}
                <span className="font-medium">{lesson.number}</span>
              </p>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => alert(`Navigating to Lesson ${lesson.number}`)}
              >
                Learn Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;

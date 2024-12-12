import { Link } from "react-router-dom";
import { useGetAllLessonsQuery } from "../../redux/features/lessons/lessonApi";

const Lessons = () => {
  const { data } = useGetAllLessonsQuery();
  const lessons = data?.data;

  if (!lessons) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Japanese Lessons
        </h1>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons &&
            lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-red-600 mb-4">
                  {lesson.lessonName}
                </h2>
                <p className="text-gray-700">
                  Lesson Number:{" "}
                  <span className="font-medium">{lesson.lessonNumber}</span>
                </p>
                <Link to={`/lessons/${lesson.lessonNumber}`}>
                  <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                    Learn Now
                  </button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;

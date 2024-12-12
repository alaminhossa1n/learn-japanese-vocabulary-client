import { useGetAllTutorialQuery } from "../../redux/features/tutorial.js/tutorialAPi";

const Tutorials = () => {
  const { data } = useGetAllTutorialQuery();
  const tutorials = data?.data;
  console.log(tutorials);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Japanese Tutorials
        </h1>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials &&
            tutorials.map((tutorial) => (
              <div
                key={tutorial._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <iframe
                  className="w-full h-48"
                  src={tutorial.videoUrl}
                  title={tutorial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-red-600">
                    {tutorial.title}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;

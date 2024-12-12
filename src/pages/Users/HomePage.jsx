import { Link } from "react-router-dom";
import { useCurrentUserQuery } from "../../redux/features/auth/authApi";

const HomePage = () => {
  const { data } = useCurrentUserQuery();

  console.log(data);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to 日本語 Learn</h1>
          <p className="text-lg mb-8">
            Master Japanese vocabulary with interactive lessons, tutorials, and
            more!
          </p>
          <Link
            to="/lessons"
            className="bg-white text-red-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                Interactive Lessons
              </h3>
              <p className="text-gray-700 mb-4">
                Access structured lessons to build your vocabulary step by step.
              </p>
              <Link
                to="/lessons"
                className="text-red-600 font-medium hover:underline"
              >
                Explore Lessons
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                Vocabulary Practice
              </h3>
              <p className="text-gray-700 mb-4">
                Learn Japanese words with pronunciation and usage examples.
              </p>
              <Link
                to="/lessons"
                className="text-red-600 font-medium hover:underline"
              >
                Start Practicing
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                Video Tutorials
              </h3>
              <p className="text-gray-700 mb-4">
                Watch engaging videos to enhance your learning experience.
              </p>
              <Link
                to="/tutorials"
                className="text-red-600 font-medium hover:underline"
              >
                Watch Tutorials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2024 日本語 Learn. All rights reserved. |{" "}
            <Link to="/about" className="hover:text-white">
              About Us
            </Link>{" "}
            |{" "}
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

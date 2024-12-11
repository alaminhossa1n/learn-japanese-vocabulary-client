const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo/Brand Name */}
          <div>
            <h1 className="text-lg font-bold text-white">日本語 Learn</h1>
            <p className="text-sm text-gray-400">Master Japanese Vocabulary</p>
          </div>

          {/* Links */}
          <div className="flex space-x-4">
            <a
              href="/lessons"
              className="text-gray-300 hover:text-white transition"
            >
              Lessons
            </a>
            <a
              href="/tutorials"
              className="text-gray-300 hover:text-white transition"
            >
              Tutorials
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:text-white transition"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-white transition"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © 2024 日本語 Learn. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

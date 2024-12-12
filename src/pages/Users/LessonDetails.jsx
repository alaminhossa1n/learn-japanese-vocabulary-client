import { useState } from "react";
import Confetti from "react-confetti";
import { useGetAllVocabulariesQuery } from "../../redux/features/vocabularies/vocabularies";
import { useParams } from "react-router-dom";

const LessonDetails = () => {
  const { id } = useParams();

  const { data } = useGetAllVocabulariesQuery({ lessonNumber: id });
  const vocabularies = data?.data;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!vocabularies) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const handlePronunciation = () => {
    const speech = new SpeechSynthesisUtterance(currentVocab.word);
    speech.lang = "ja-JP";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const handleNext = () => {
    if (currentIndex < vocabularies?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => setCompleted(false), 5000); // Reset confetti after 5 seconds
  };

  const currentVocab = vocabularies[currentIndex];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {completed && <Confetti />}
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Lesson Vocabulary
        </h1>

        {/* Vocabulary Details */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            {currentVocab?.word}
          </h2>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Pronunciation:</span>{" "}
            {currentVocab?.pronunciation}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Meaning:</span>{" "}
            {currentVocab?.meaning}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold">When to say:</span>{" "}
            {currentVocab?.whenToSay}
          </p>

          {/* Pronunciation Button */}
          <button
            onClick={handlePronunciation}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Play Pronunciation
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-md ${
              currentIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Previous
          </button>
          {currentIndex === vocabularies?.length - 1 ? (
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Complete
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;

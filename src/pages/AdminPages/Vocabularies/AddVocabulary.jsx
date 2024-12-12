import { useState } from "react";
import { toast } from "sonner";
import { useCreateVocabularyMutation } from "../../../redux/features/vocabularies/vocabularies";
import { useCurrentUserQuery } from "../../../redux/features/auth/authApi";

const AddVocabulary = () => {
  const [formData, setFormData] = useState({
    word: "",
    pronunciation: "",
    meaning: "",
    whenToSay: "",
    lessonNumber: "",
  });

  const { data } = useCurrentUserQuery();
  const user = data?.data;
  if (user) {
    formData.adminEmail = user.email;
  }

  const [createVocabulary, { isLoading }] = useCreateVocabularyMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.word ||
      !formData.pronunciation ||
      !formData.meaning ||
      !formData.whenToSay ||
      !formData.lessonNumber
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await createVocabulary(formData).unwrap();
      if (response.success) {
        toast.success("Vocabulary added successfully!");
        setFormData({
          word: "",
          pronunciation: "",
          meaning: "",
          whenToSay: "",
          lessonNumber: "",
        });
      } else {
        toast.error("Failed to add vocabulary.");
      }
    } catch (error) {
      console.error("Error adding vocabulary:", error);
      toast.error("An error occurred while adding vocabulary.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Add New Vocabulary
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label
            htmlFor="word"
            className="block text-sm font-medium text-gray-700"
          >
            Word
          </label>
          <input
            id="word"
            name="word"
            type="text"
            value={formData.word}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm pl-2 py-2"
            placeholder="Enter the word"
          />
        </div>

        <div>
          <label
            htmlFor="pronunciation"
            className="block text-sm font-medium text-gray-700"
          >
            Pronunciation
          </label>
          <input
            id="pronunciation"
            name="pronunciation"
            type="text"
            value={formData.pronunciation}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm pl-2 py-2"
            placeholder="Enter the pronunciation"
          />
        </div>

        <div>
          <label
            htmlFor="meaning"
            className="block text-sm font-medium text-gray-700"
          >
            Meaning
          </label>
          <input
            id="meaning"
            name="meaning"
            type="text"
            value={formData.meaning}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm pl-2 py-2"
            placeholder="Enter the meaning"
          />
        </div>

        <div>
          <label
            htmlFor="whenToSay"
            className="block text-sm font-medium text-gray-700"
          >
            When to Say
          </label>
          <input
            id="whenToSay"
            name="whenToSay"
            type="text"
            value={formData.whenToSay}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm pl-2 py-2"
            placeholder="When to say this word"
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
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm pl-2 py-2"
            placeholder="Enter the lesson number"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white ${
              isLoading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? "Adding..." : "Add Vocabulary"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVocabulary;

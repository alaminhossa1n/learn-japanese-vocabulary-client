import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteVocabularyMutation,
  useGetAllVocabulariesQuery,
  useUpdateVocabularyMutation,
} from "../../../redux/features/vocabularies/vocabularies";

const ModifyVocabulary = () => {
  const { data, refetch } = useGetAllVocabulariesQuery();
  const [updateVocabulary] = useUpdateVocabularyMutation();
  const [deleteVocabulary] = useDeleteVocabularyMutation();

  const vocabularies = data?.data;

  const [editingVocabulary, setEditingVocabulary] = useState(null);
  const [formData, setFormData] = useState({
    word: "",
    pronunciation: "",
    meaning: "",
    whenToSay: "",
    lessonNumber: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [filter, setFilter] = useState("");

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Show edit form with selected vocabulary data
  const handleEditVocabulary = (vocabulary) => {
    setEditingVocabulary(vocabulary);
    setFormData({
      word: vocabulary.word,
      pronunciation: vocabulary.pronunciation,
      meaning: vocabulary.meaning,
      whenToSay: vocabulary.whenToSay,
      lessonNumber: vocabulary.lessonNumber,
    });
  };

  // Submit the updated vocabulary
  const handleUpdateVocabulary = async () => {
    try {
      await updateVocabulary({
        _id: editingVocabulary._id,
        updatedDoc: formData,
      }).unwrap();
      toast("Vocabulary updated successfully!");
      setEditingVocabulary(null);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  // Show delete confirmation popup
  const handleDeleteVocabulary = (vocabularyId) => {
    setDeleteConfirmation(vocabularyId);
  };

  // Confirm and delete the vocabulary
  const confirmDeleteVocabulary = async () => {
    try {
      await deleteVocabulary(deleteConfirmation).unwrap();
      toast("Vocabulary deleted successfully!");
      setDeleteConfirmation(null);
      refetch();
    } catch (error) {
      console.error("Error deleting vocabulary:", error);
    }
  };

  // Filter the vocabularies by lesson number
  const filteredVocabularies = vocabularies?.filter((vocabulary) =>
    vocabulary.lessonNumber.toString().includes(filter)
  );

  if (!vocabularies) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Manage Vocabularies
      </h1>

      {/* Edit Vocabulary Form */}
      {editingVocabulary && (
        <div className="bg-white p-6 shadow-md rounded-lg my-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Vocabulary
          </h2>
          <div className="space-y-4">
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
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2"
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
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2"
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
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2"
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
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2"
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
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingVocabulary(null)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateVocabulary}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Update Vocabulary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Input */}
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Filter by Lesson No"
          className="p-2 border border-gray-300 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Vocabulary List */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Existing Vocabularies
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Word
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Meaning
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Pronunciation
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                When to Say
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Lesson No
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVocabularies?.map((vocabulary) => (
              <tr key={vocabulary._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vocabulary.word}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vocabulary.meaning}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vocabulary.pronunciation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vocabulary.whenToSay}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vocabulary.lessonNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEditVocabulary(vocabulary)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVocabulary(vocabulary._id)}
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

      {/* Delete Confirmation Popup */}
      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this vocabulary?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={confirmDeleteVocabulary}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyVocabulary;

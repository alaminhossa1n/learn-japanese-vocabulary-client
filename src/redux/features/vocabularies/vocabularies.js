import { baseApi } from "../../api/baseApi";

const vocabularyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVocabularies: builder.query({
      query: (queryParams) => ({
        url: "/vocabulary/get-all-vocabulary",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["vocabularies"],
    }),

    createVocabulary: builder.mutation({
      query: (newVocabulary) => ({
        url: "/vocabulary/create",
        method: "POST",
        body: newVocabulary,
      }),
      invalidatesTags: ["vocabularies"],
    }),

    updateVocabulary: builder.mutation({
      query: ({ updatedLesson }) => ({
        url: `/vocabulary/update/`,
        method: "PATCH",
        body: updatedLesson,
      }),
      invalidatesTags: ["vocabularies"],
    }),

    deleteVocabulary: builder.mutation({
      query: (id) => ({
        url: `/vocabulary/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vocabularies"],
    }),
  }),
});

export const {
  useGetAllVocabulariesQuery,
  useCreateVocabularyMutation,
  useUpdateVocabularyMutation,
  useDeleteVocabularyMutation,
} = vocabularyApi;

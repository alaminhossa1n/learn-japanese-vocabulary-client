import { baseApi } from "../../api/baseApi";

const vocabularyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVocabularies: builder.query({
      query: (queryParams) => ({
        url: "/vocabulary/get-all-vocabulary",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["tutorials"],
    }),
  }),
});

export const { useGetAllVocabulariesQuery } = vocabularyApi;

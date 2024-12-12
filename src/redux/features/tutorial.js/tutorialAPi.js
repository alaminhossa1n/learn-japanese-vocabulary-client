import { baseApi } from "../../api/baseApi";

const tutorialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTutorial: builder.query({
      query: () => ({
        url: "/tutorial/get-all-tutorial",
        method: "GET",
      }),
      providesTags: ["tutorials"],
    }),
  }),
});

export const { useGetAllTutorialQuery } = tutorialApi;

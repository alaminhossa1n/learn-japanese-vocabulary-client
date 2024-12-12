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

    createTutorial: builder.mutation({
      query: (t) => ({
        url: "/tutorial/create",
        method: "POST",
        body: t,
      }),
      invalidatesTags: ["tutorials"],
    }),

    deleteTutorial: builder.mutation({
      query: (id) => ({
        url: `/tutorial/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tutorials"],
    }),
  }),
});

export const {
  useGetAllTutorialQuery,
  useCreateTutorialMutation,
  useDeleteTutorialMutation,
} = tutorialApi;

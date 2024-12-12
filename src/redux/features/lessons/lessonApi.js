import { baseApi } from "../../api/baseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLessons: builder.query({
      query: () => ({
        url: "/lesson/get-all-lesson",
        method: "GET",
      }),
      providesTags: ["lessons"],
    }),
  }),
});

export const { useGetAllLessonsQuery } = lessonApi;

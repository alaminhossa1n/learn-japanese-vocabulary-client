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

    createLesson: builder.mutation({
      query: (newLesson) => ({
        url: "/lesson/create",
        method: "POST",
        body: newLesson,
      }),
      invalidatesTags: ["lessons"],
    }),

    updateLesson: builder.mutation({
      query: ({ updatedLesson }) => ({
        url: `/lesson/update/`,
        method: "PATCH",
        body: updatedLesson,
      }),
      invalidatesTags: ["lessons"],
    }),

    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lesson/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lessons"],
    }),
  }),
});

export const {
  useGetAllLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;

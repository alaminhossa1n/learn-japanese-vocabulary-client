import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/user/sign-up",
        method: "POST",
        body: userInfo,
      }),
    }),

    signin: builder.mutation({
      query: (userInfo) => ({
        url: "/user/sign-in",
        method: "POST",
        body: userInfo,
      }),
    }),

    currentUser: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const { useSignUpMutation, useCurrentUserQuery, useSigninMutation } =
  authApi;

export default authApi;

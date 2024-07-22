import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/auth`,
    credentials: "include",
  }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: credentials => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    signupUser: builder.mutation({
      query: credentials => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    updateMe: builder.mutation({
      query: userData => ({
        url: "update-me",
        method: "PATCH",
        body: userData,
      }),
    }),
    getUserProfile: builder.query({
      query: () => "me",
    }),
    updatePassword: builder.query({
      query: passwordData => ({
        url: "update-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useLogoutUserMutation,
  useUpdateMeMutation,
} = userApi;

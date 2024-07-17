import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/v1/auth` }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: credentials => ({
        url: "login",
        method: "POST",
        body: credentials,
        credentials: "include", // Include credentials in requests
      }),
    }),
    signupUser: builder.mutation({
      query: credentials => ({
        url: "signup",
        method: "POST",
        body: credentials,
        credentials: "include", // Include credentials in requests
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include", // Include credentials in requests
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useLogoutUserMutation,
} = userApi;

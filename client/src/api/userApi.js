import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/auth" }),
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
  }),
});

export const { useLoginUserMutation, useSignupUserMutation } = userApi;

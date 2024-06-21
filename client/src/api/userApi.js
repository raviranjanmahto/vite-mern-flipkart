import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://raviranjan-flipkart-server.vercel.app";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/v1/auth` }),
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

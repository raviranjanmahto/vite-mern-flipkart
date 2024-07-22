import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/product`,
    credentials: "include",
  }),
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => "all-products",
    }),
    getProductDetails: builder.query({
      query: id => `${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;

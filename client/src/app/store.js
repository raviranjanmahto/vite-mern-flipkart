import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";
import { userApi } from "../api/userApi";
import productsReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import usersReducer from "../features/users/userSlice";

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productApi.middleware, userApi.middleware),
});

export default store;

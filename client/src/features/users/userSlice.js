import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    token: null,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, logout } = usersSlice.actions;

export default usersSlice.reducer;

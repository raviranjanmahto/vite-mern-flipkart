import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },

    logout(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, setToken, logout } = usersSlice.actions;

export default usersSlice.reducer;

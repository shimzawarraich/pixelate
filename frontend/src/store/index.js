import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");  // ✅ Store in localStorage
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");  // ✅ Clear from localStorage
    },
  },
});

export const loginActions = loginSlice.actions;

export const store = configureStore({
  reducer: { login: loginSlice.reducer },
});

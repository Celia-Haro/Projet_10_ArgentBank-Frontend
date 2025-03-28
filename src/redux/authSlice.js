import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const initialState = {
    user: null,
    token: initialToken ? initialToken : null,
    isAuthenticated: !!initialToken,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem("token", action.payload.token);
        },
        loginFailure: (state, action) => {
            console.log(state)
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("token");
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

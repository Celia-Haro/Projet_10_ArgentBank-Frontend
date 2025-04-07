import { createSlice } from "@reduxjs/toolkit";

const rememberMe = localStorage.getItem("rememberMe") === true;

const storedToken = rememberMe ? localStorage.getItem("token") : sessionStorage.getItem("token");
const storedUser = rememberMe ? localStorage.getItem("user") : sessionStorage.getItem("user");

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken ? storedToken : null,
    isAuthenticated: !!storedToken,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.rememberMe = action.payload.rememberMe;
            state.isAuthenticated = true;
            state.error = null;
            sessionStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("user", JSON.stringify(action.payload.user));

            if (state.rememberMe === true) {
                console.log(state.rememberMe, state.user, state.token)
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            }
            else {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                console.log("rememberMe est false")
            }
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("rememberMe");
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

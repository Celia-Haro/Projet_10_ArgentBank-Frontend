import { createSlice } from "@reduxjs/toolkit";

const rememberMe = localStorage.getItem("rememberMe") === "true";

const storedToken = rememberMe ? localStorage.getItem("token") : sessionStorage.getItem("token");
const storedUser = rememberMe ? localStorage.getItem("user") : sessionStorage.getItem("user");

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken ? storedToken : null,
    isAuthenticated: !!storedToken,
    error: null,
    rememberMe: rememberMe,
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
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("rememberMe", true);
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.setItem("rememberMe", false);
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

        updateUser: (state, action) => {
            if (state.user) {
                state.user.userName = action.payload.userName;

                const updatedUser = JSON.stringify(state.user);
                if (state.rememberMe) {
                    localStorage.setItem("user", updatedUser);
                } else {
                    sessionStorage.setItem("user", updatedUser);
                }
            }
        }
    },
});

export const { loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    user: { email: string } | null;
    token: string | null;
};

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ email: string; token: string }>
        ) => {
            state.user = { email: action.payload.email };
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        registerSuccess: (
            state,
            action: PayloadAction<{ email: string; token: string }>
        ) => {
            state.user = { email: action.payload.email };
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { loginSuccess, registerSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

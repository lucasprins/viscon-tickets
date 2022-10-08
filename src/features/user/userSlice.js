import { createSlice } from "@reduxjs/toolkit";

// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    language: 'en'
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    }
});

const { reducer, actions } = authSlice;

// Actions
export const getCurrentLanguage = (state) => state.user.language;

export const { setLanguage } = actions
export default reducer;
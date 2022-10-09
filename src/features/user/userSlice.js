import { createSlice } from "@reduxjs/toolkit";

// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: {},
    language: 'en',
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    }
});

const { reducer, actions } = userSlice;

// Actions
export const getCurrentLanguage = (state) => state.user.language;

export const { setLanguage } = actions
export default reducer;
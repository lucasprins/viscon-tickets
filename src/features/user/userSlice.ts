import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// const user = JSON.parse(localStorage.getItem("user"));

type InitialState = {
    user: object,
    language: string
}

const initialState: InitialState = {
    user: {},
    language: 'en',
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
    }
});

const { reducer, actions } = userSlice;

// Actions
export const getCurrentLanguage = (state: RootState) => state.user.language;

export const { setLanguage } = actions
export default reducer;
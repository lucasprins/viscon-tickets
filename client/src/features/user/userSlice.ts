import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { companyType } from "../../utils/types";

const initialLanguage = localStorage.getItem("language");

type InitialState = {
    language: string;
}

const initialState: InitialState = {
    language: initialLanguage ? initialLanguage : "en",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            localStorage.setItem('language', action.payload);
            state.language = action.payload;
        },
    }
});

const { reducer, actions } = userSlice;

// Actions
export const getCurrentLanguage = (state: RootState) => state.user.language;

export const { setLanguage } = actions
export default reducer;
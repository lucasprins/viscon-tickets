import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UserType } from "../../types/UserType";

// const user = JSON.parse(localStorage.getItem("user"));

type InitialState = {
    user: UserType,
    language: string
}

const initialState: InitialState = {
    user: {
        firstName: "Lucas",
        lastName: "Prins",
        company: "Hogeschool Rotterdam",
        phoneNumber: "+3163499770"
    },
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
export const getUser = (state: RootState) => state.user.user

export const { setLanguage } = actions
export default reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UserType } from "../../utils/types";

// const user = JSON.parse(localStorage.getItem("user"));

type InitialState = {
    user: UserType,
    language: string
}

const initialState: InitialState = {
    user: {
        firstName: "Lucas",
        preposition: "",
        lastName: "Prins",
        phoneNumber: "+3163499770",
        role: "viscon-admin",
        email: "lucas2002prins@gmail.com",
        isActive: true,
        company: {
            companyId: '320923223',
            name: 'Viscon',
            country: 'The Netherlands',
            isActive: true
        } 
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
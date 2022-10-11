import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type InitialState = {
    ticket: {
        firstName: string,
        lastName: string,
        company: string,
        phoneNumber: string
    }
}

const initialState: InitialState = {
    ticket: {
        firstName: '',
        lastName: '',
        company: '',
        phoneNumber: ''
    }
}

const createTicketSlice = createSlice({
    name: "createTicket",
    initialState,
    reducers: {
        addContactInformation: (state, action) => {
            state.ticket = action.payload;
        }
    },
    extraReducers: {},
});

const { reducer, actions } = createTicketSlice;

// Actions
export const getTicket = (state: RootState) => state.createTicket.ticket;

export const {
    addContactInformation
} = actions

export default reducer;
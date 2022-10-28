import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createTicketType, ticketType, userType } from "../../utils/types";
import { setMessage } from "../auth/messageSlice";
import { toggleBackdrop } from "../modal/modalSlice";

import TicketService from "./ticketsService";

type initialState = {
    tickets: any[];
    ticket: ticketType | any;

    creatingTicket: boolean;
    createdTicketSuccess: boolean | null;
    fetchingTicket: boolean;
    claimingTicket: boolean;
    claimedTicketSuccess: boolean | null;
    unclaimingTicket: boolean;
    unclaimedTicketSuccess: boolean | null;
};

const initialState: initialState = {
    tickets: [],
    ticket: null,

    creatingTicket: false,
    createdTicketSuccess: null,
    fetchingTicket: false,
    claimingTicket: false,
    claimedTicketSuccess: null,
    unclaimingTicket: false,
    unclaimedTicketSuccess: null,
};

export const createTicket = createAsyncThunk(
    "tickets/createTicket",
    async ({ ticket, user }: { ticket: createTicketType; user: userType }, thunkAPI) => {
        try {
            const response = await TicketService.createTicket(ticket, user);
            console.log(response);
            return { ticket: response.data.data };
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setMessage(error.message));
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const claimTicketAsync = createAsyncThunk(
    "tickets/claimTicketAsync",
    async ({ ticketId, accessToken }: { ticketId: string; accessToken: string }, thunkAPI) => {
        try {
            const response = await TicketService.claimTicket(ticketId, accessToken);
            console.log(response);
            return { response: response.data };
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setMessage(error.message));
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const unclaimTicketAsync = createAsyncThunk(
    "tickets/unclaimTicketAsync",
    async ({ ticketId, accessToken }: { ticketId: string; accessToken: string }, thunkAPI) => {
        try {
            const response = await TicketService.unclaimTicket(ticketId, accessToken);
            console.log(response);
            return { ticket: response.data.data };
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setMessage(error.message));
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchTicketAsync = createAsyncThunk(
    "tickets/fetchTicketAsync",
    async ({ ticketId, accessToken }: { ticketId: string; accessToken: string }, thunkAPI) => {
        try {
            const response = await TicketService.getTicket(ticketId, accessToken);
            console.log(response);
            return { ticket: response.data.data };
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setMessage(error.message));
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        resetCreateTicket: (state) => {
            state.createdTicketSuccess = null;
            state.creatingTicket = false;
            state.ticket = null;
        },
        resetTicket: (state) => {
            state.ticket = null;
            state.fetchingTicket = false;
            state.claimedTicketSuccess = null;
            state.unclaimedTicketSuccess = null;
        },
        resetTicketActions: (state) => {
            state.claimedTicketSuccess = null;
            state.unclaimedTicketSuccess = null;
        },
    },
    extraReducers: {
        [createTicket.pending.toString()]: (state) => {
            state.creatingTicket = true;
            console.log("Creating ticket...");
        },
        [createTicket.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.creatingTicket = false;
            state.createdTicketSuccess = action.payload.ticket === null ? false : true;
            state.ticket = action.payload.ticket;
        },
        [createTicket.rejected.toString()]: (state) => {
            state.creatingTicket = false;
            state.createdTicketSuccess = false;
            console.log("Failed to create ticket.");
        },
        [fetchTicketAsync.pending.toString()]: (state) => {
            state.fetchingTicket = true;
            console.log("Fetching ticket...");
        },
        [fetchTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.fetchingTicket = false;
            state.ticket = action.payload.ticket;
        },
        [fetchTicketAsync.rejected.toString()]: (state) => {
            state.fetchingTicket = false;
            console.log("Failed to fetch ticket.");
        },
        [claimTicketAsync.pending.toString()]: (state) => {
            state.claimingTicket = true;
            console.log("Claiming ticket...");
        },
        [claimTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.claimingTicket = false;
            if (action.payload.response.message === "Ticket has already been claimed.") {
                state.claimedTicketSuccess = false;
            } else {
                state.claimedTicketSuccess = true;
            }
            console.log(action.payload);
            state.ticket = action.payload.response.data;
        },
        [claimTicketAsync.rejected.toString()]: (state) => {
            state.claimingTicket = false;
            state.claimedTicketSuccess = false;
            console.log("Failed to claim ticket.");
        },
        [unclaimTicketAsync.pending.toString()]: (state) => {
            state.unclaimingTicket = true;
            console.log("Unclaiming ticket...");
        },
        [unclaimTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.unclaimingTicket = false;
            state.unclaimedTicketSuccess = action.payload.ticket === null ? false : true;
            state.ticket = action.payload.ticket === null ? state.ticket : action.payload.ticket;
        },
        [unclaimTicketAsync.rejected.toString()]: (state) => {
            state.unclaimingTicket = false;
            state.unclaimedTicketSuccess = false;
            console.log("Failed to unclaim ticket.");
        },
    },
});

export const getCreatingTicket = (state: RootState) => state.tickets.creatingTicket;
export const getTicket = (state: RootState) => state.tickets.ticket;
export const getCreatedTicketSuccess = (state: RootState) => state.tickets.createdTicketSuccess;
export const getFetchingTicket = (state: RootState) => state.tickets.fetchingTicket;
export const getClaimingTicket = (state: RootState) => state.tickets.claimingTicket;
export const getClaimedTicketSuccess = (state: RootState) => state.tickets.claimedTicketSuccess;
export const getUnclaimingTicket = (state: RootState) => state.tickets.unclaimingTicket;
export const getUnclaimedTicketSuccess = (state: RootState) => state.tickets.unclaimedTicketSuccess;

export const { resetCreateTicket, resetTicket, resetTicketActions } = ticketsSlice.actions;

const { reducer } = ticketsSlice;
export default reducer;

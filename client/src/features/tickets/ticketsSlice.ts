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
    resolvingTicket: boolean;
    resolvedTicketSuccess: boolean | null;
    openingTicket: boolean;
    openedTicketSuccess: boolean | null;
    cancellingTicket: boolean;
    cancelledTicketSuccess: boolean | null;
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
    resolvingTicket: false,
    resolvedTicketSuccess: null,
    openingTicket: false,
    openedTicketSuccess: null,
    cancellingTicket: false,
    cancelledTicketSuccess: null,
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
            return { response: response.data };
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setMessage(error.message));
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const resolveTicketAsync = createAsyncThunk(
    "tickets/resolveTicketAsync",
    async ({ ticketId, accessToken }: { ticketId: string; accessToken: string }, thunkAPI) => {
        try {
            const response = await TicketService.resolveTicket(ticketId, accessToken);
            console.log(response);
            return { response: response.data };
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setMessage(error.message));
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const openTicketAsync = createAsyncThunk(
    "tickets/openTicketAsync",
    async ({ ticketId, accessToken }: { ticketId: string; accessToken: string }, thunkAPI) => {
        try {
            const response = await TicketService.openTicket(ticketId, accessToken);
            console.log(response);
            return { response: response.data };
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

export const cancelTicketAsync = createAsyncThunk(
    "tickets/cancelTicketAsync",
    async ({ ticketId, accessToken }: { ticketId: string; accessToken: string }, thunkAPI) => {
        try {
            const response = await TicketService.cancelTicket(ticketId, accessToken);
            console.log(response);
            return { response: response.data };
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
            state.resolvedTicketSuccess = null;
            state.openedTicketSuccess = null;
            state.cancelledTicketSuccess = null;
        },
        resetTicketActions: (state) => {
            state.claimedTicketSuccess = null;
            state.unclaimedTicketSuccess = null;
            state.resolvedTicketSuccess = null;
            state.openedTicketSuccess = null;
            state.cancelledTicketSuccess = null;
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
        },
        [fetchTicketAsync.pending.toString()]: (state) => {
            state.fetchingTicket = true;
        },
        [fetchTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.fetchingTicket = false;
            state.ticket = action.payload.ticket;
        },
        [fetchTicketAsync.rejected.toString()]: (state) => {
            state.fetchingTicket = false;
        },

        [claimTicketAsync.pending.toString()]: (state) => {
            state.claimingTicket = true;
        },
        [claimTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.claimingTicket = false;
            console.log(action.payload.response);
            state.claimedTicketSuccess = action.payload.response.success ? true : false;
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
            state.unclaimedTicketSuccess = action.payload.response.success ? true : false;
            state.ticket = action.payload.response.data;
        },
        [unclaimTicketAsync.rejected.toString()]: (state) => {
            state.unclaimingTicket = false;
            state.unclaimedTicketSuccess = false;
        },

        [resolveTicketAsync.pending.toString()]: (state) => {
            state.resolvingTicket = true;
        },
        [resolveTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.resolvingTicket = false;
            state.resolvedTicketSuccess = action.payload.response.success ? true : false;
            state.ticket = action.payload.response.data;
        },
        [resolveTicketAsync.rejected.toString()]: (state) => {
            state.resolvingTicket = false;
            state.resolvedTicketSuccess = false;
        },

        [openTicketAsync.pending.toString()]: (state) => {
            state.openingTicket = true;
        },
        [openTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.openingTicket = false;
            state.openedTicketSuccess = action.payload.response.success ? true : false;
            state.ticket = action.payload.response.data;
        },
        [openTicketAsync.rejected.toString()]: (state) => {
            state.openingTicket = false;
            state.openedTicketSuccess = false;
        },

        [cancelTicketAsync.pending.toString()]: (state) => {
            state.cancellingTicket = true;
        },
        [cancelTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.cancellingTicket = false;
            state.cancelledTicketSuccess = action.payload.response.success ? true : false;
            state.ticket = action.payload.response.data;
        },
        [cancelTicketAsync.rejected.toString()]: (state) => {
            state.cancellingTicket = false;
            state.cancelledTicketSuccess = false;
        }
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
export const getResolvingTicket = (state: RootState) => state.tickets.resolvingTicket;
export const getResolvedTicketSuccess = (state: RootState) => state.tickets.resolvedTicketSuccess;
export const getOpeningTicket = (state: RootState) => state.tickets.openingTicket;
export const getOpenedTicketSuccess = (state: RootState) => state.tickets.openedTicketSuccess;
export const getCancellingTicket = (state: RootState) => state.tickets.cancellingTicket;
export const getCancelledTicketSuccess = (state: RootState) => state.tickets.cancelledTicketSuccess;

export const { resetCreateTicket, resetTicket, resetTicketActions } = ticketsSlice.actions;

const { reducer } = ticketsSlice;
export default reducer;

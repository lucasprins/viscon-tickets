import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { RootState } from "../../store";
import { createTicketType, ticketType, userType } from "../../utils/types";
import { setMessage } from "../auth/messageSlice";
import { toggleBackdrop } from "../modal/modalSlice";
import TicketsMetricsService from "./ticketsMetricsService";

import TicketService from "./ticketsService";

type initialState = {
    tickets: any[];
    ticket: ticketType | any;
    totalTickets: number;

    totalTicketsByUser: number;
    fetchingTotalTicketsByUser: boolean;
    fetchedTotalTicketsByUserSuccess: boolean;

    fetchingTotalTicketsThisWeek: boolean;
    fetchedTotalTicketsThisWeekSuccess: boolean;
    totalTicketsThisWeek: number;

    creatingTicket: boolean;
    createdTicketSuccess: boolean | null;
    fetchingTicket: boolean;
    fetchedTicketSuccess: boolean | null;
    fetchingTickets: boolean;
    fetchedTicketsSuccess: boolean | null;
    fetchingTotalTickets: boolean;
    fetchedTotalTicketsSuccess: boolean | null;
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
    totalTickets: 0,

    totalTicketsByUser: 0,
    fetchingTotalTicketsByUser: false,
    fetchedTotalTicketsByUserSuccess: false,

    fetchingTotalTicketsThisWeek: false,
    fetchedTotalTicketsThisWeekSuccess: false,
    totalTicketsThisWeek: 0,

    creatingTicket: false,
    createdTicketSuccess: null,
    fetchingTicket: false,
    fetchedTicketSuccess: null,
    fetchingTickets: false,
    fetchedTicketsSuccess: null,
    fetchingTotalTickets: false,
    fetchedTotalTicketsSuccess: null,
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
    async ({ ticketId, accessToken, cancelToken }: { ticketId: string; accessToken: string, cancelToken: CancelToken }, thunkAPI) => {
        try {
            const response = await TicketService.getTicket(ticketId, accessToken, cancelToken);
            return { response: response.data };
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setMessage(error.message));
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchTicketsAsync = createAsyncThunk(
    "tickets/fetchTicketsAsync",
    async ({ page, accessToken, cancelToken }: { page: Number, accessToken: string, cancelToken: CancelToken }, thunkAPI) => {
        try {
            const response = await TicketService.getTickets(page, accessToken, cancelToken);
            return { response: response.data };
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchTotalTicketsAsync = createAsyncThunk(
    "tickets/fetchTotalTicketsAsync",
    async ({ accessToken, cancelToken }: { accessToken: string, cancelToken: CancelToken }, thunkAPI) => {
        try {
            const response = await TicketService.getTotalTickets(accessToken, cancelToken);
            return { response: response.data };
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchTotalTicketsByUser = createAsyncThunk(
    "tickets/fetchTotalTicketsByUser",
    async ({ accessToken, cancelToken }: { accessToken: string, cancelToken: CancelToken }, thunkAPI) => {
        try {
            const response = await TicketsMetricsService.getTotalTicketsByUser(accessToken, cancelToken);
            return { response: response.data };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const cancelTicketAsync = createAsyncThunk(
    "tickets/cancelTicketAsync",
    async ({ ticketId, accessToken }: { ticketId: string; accessToken: string }, thunkAPI) => {
        try {
            const response = await TicketService.cancelTicket(ticketId, accessToken);
            return { response: response.data };
        } catch (error: any) {
            console.log(error);
            thunkAPI.dispatch(setMessage(error.message));
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchTotalTicketsThisWeek = createAsyncThunk(
    "tickets/fetchTotalTicketsThisWeek",
    async ({ accessToken, cancelToken }: { accessToken: string, cancelToken: CancelToken }, thunkAPI) => {
        try {
            const response = await TicketsMetricsService.getTotalTicketsThisWeek(accessToken, cancelToken);
            console.log(response);
            return { response: response.data };
        } catch (error: any) {
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
        resetTickets: (state) => {
            state.tickets = [];
            state.ticket = null;
            state.fetchedTicketsSuccess = null;
            state.fetchingTickets = false;
            state.fetchingTotalTickets = false;
            state.fetchedTotalTicketsSuccess = null;
            state.fetchingTicket = false;
            state.claimedTicketSuccess = null;
            state.unclaimedTicketSuccess = null;
            state.resolvedTicketSuccess = null;
            state.openedTicketSuccess = null;
            state.cancelledTicketSuccess = null;
            state.fetchingTickets = false;
            state.fetchedTicketSuccess = null;
        },
        resetTicketsMetrics: (state) => {
            state.totalTickets = 0;
            state.totalTicketsByUser = 0;
            state.totalTicketsThisWeek = 0;
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
            state.fetchedTicketSuccess = action.payload.response.success ? true : false;
            state.ticket = action.payload.response.data;
        },
        [fetchTicketAsync.rejected.toString()]: (state) => {
            state.fetchingTicket = false;
            state.fetchedTicketSuccess = false;
        },

        [fetchTicketsAsync.pending.toString()]: (state) => {
            state.fetchingTickets = true;
        },
        [fetchTicketsAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.fetchingTickets = false;
            state.fetchedTicketsSuccess = action.payload.response.success ? true : false;
            state.tickets = action.payload.response.data;
        },
        [fetchTicketsAsync.rejected.toString()]: (state) => {
            state.fetchingTickets = false;
            state.fetchedTicketsSuccess = false;
        },

        [fetchTotalTicketsAsync.pending.toString()]: (state) => {
            state.fetchingTotalTickets = true;
        },
        [fetchTotalTicketsAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.fetchingTotalTickets = false;
            state.fetchedTotalTicketsSuccess = action.payload.response.success ? true : false;
            state.totalTickets = action.payload.response.data;
        },
        [fetchTotalTicketsAsync.rejected.toString()]: (state) => {
            state.fetchingTotalTickets = false;
            state.fetchedTotalTicketsSuccess = false;
        },

        [fetchTotalTicketsByUser.pending.toString()]: (state) => {
            state.fetchingTotalTicketsByUser = true;
        },
        [fetchTotalTicketsByUser.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.fetchingTotalTicketsByUser = false;
            state.fetchedTotalTicketsByUserSuccess = action.payload.response.success ? true : false;
            state.totalTicketsByUser = action.payload.response.data;
        },
        [fetchTotalTicketsByUser.rejected.toString()]: (state) => {
            state.fetchingTotalTicketsByUser = false;
            state.fetchedTotalTicketsByUserSuccess = false;
        },

        [fetchTotalTicketsThisWeek.pending.toString()]: (state) => {
            state.fetchingTotalTicketsThisWeek = true;
        },
        [fetchTotalTicketsThisWeek.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.fetchingTotalTicketsThisWeek = false;
            state.fetchedTotalTicketsThisWeekSuccess = action.payload.response.success ? true : false;
            state.totalTicketsThisWeek = action.payload.response.data;
        },
        [fetchTotalTicketsThisWeek.rejected.toString()]: (state) => {
            state.fetchingTotalTicketsThisWeek = false;
            state.fetchedTotalTicketsThisWeekSuccess = false;
        },
        
        [claimTicketAsync.pending.toString()]: (state) => {
            state.claimingTicket = true;
        },
        [claimTicketAsync.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            state.claimingTicket = false;
            state.claimedTicketSuccess = action.payload.response.success ? true : false;
            state.ticket = action.payload.response.data;
        },
        [claimTicketAsync.rejected.toString()]: (state) => {
            state.claimingTicket = false;
            state.claimedTicketSuccess = false;
        },

        [unclaimTicketAsync.pending.toString()]: (state) => {
            state.unclaimingTicket = true;
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
export const getTickets = (state: RootState) => state.tickets.tickets;
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
export const getFetchingTickets = (state: RootState) => state.tickets.fetchingTickets;
export const getFetchedTicketsSuccess = (state: RootState) => state.tickets.fetchedTicketsSuccess;
export const getFetchedTicketSuccess = (state: RootState) => state.tickets.fetchedTicketSuccess;
export const getFetchingTotalTickets = (state: RootState) => state.tickets.fetchingTotalTickets;
export const getFetchedTotalTicketsSuccess = (state: RootState) => state.tickets.fetchedTotalTicketsSuccess;
export const getTotalTickets = (state: RootState) => state.tickets.totalTickets;
export const getTotalTicketsByUser = (state: RootState) => state.tickets.totalTicketsByUser;
export const getFetchingTotalTicketsByUser = (state: RootState) => state.tickets.fetchingTotalTicketsByUser;
export const getFetchedTotalTicketsByUserSuccess = (state: RootState) => state.tickets.fetchedTotalTicketsByUserSuccess;
export const getFetchingTotalTicketsThisWeek = (state: RootState) => state.tickets.fetchingTotalTicketsThisWeek;
export const getFetchedTotalTicketsThisWeekSuccess = (state: RootState) => state.tickets.fetchedTotalTicketsThisWeekSuccess;
export const getTotalTicketsThisWeek = (state: RootState) => state.tickets.totalTicketsThisWeek;

export const { resetCreateTicket, resetTickets, resetTicketActions, resetTicketsMetrics } = ticketsSlice.actions;

const { reducer } = ticketsSlice;
export default reducer;

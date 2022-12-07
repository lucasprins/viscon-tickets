import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { RootState } from "../../store";
import { createTicketType, ticketType, userType } from "../../utils/types";
import { toggleBackdrop } from "../modal/modalSlice";

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

    },
});

export const getCreatingTicket = (state: RootState) => state.tickets.creatingTicket;
export const getCreatedTicketSuccess = (state: RootState) => state.tickets.createdTicketSuccess;


export const { resetCreateTicket, resetTickets, resetTicketActions, resetTicketsMetrics } = ticketsSlice.actions;

const { reducer } = ticketsSlice;
export default reducer;

import axios, { Cancel, CancelToken } from "axios";
import { createTicketType, userType } from "../../utils/types";

const API_URL = "https://localhost:7295/api/ticket/";

const createTicket = async (ticket: createTicketType, user: userType) => {
    const response = await axios.post(
        API_URL + "CreateTicket",
        {
            phoneNumber: ticket.phoneNumber,
            issue: ticket.issue,
            actionExpected: ticket.actionExpected,
            actionPerformed: ticket.actionPerformed,
            extraInfo: ticket.extraInfo,
            machineId: ticket.machine.machineId,
            creatorId: user.id,
            companyId: user.company.id,
        },
        {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        }
    );
    return response;
};

const getTicket = async (ticketId: string, accessToken: string, cancelToken: CancelToken) => {
    const response = await axios.get(API_URL + "GetTicket/" + ticketId, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cancelToken: cancelToken,
    });
    return response;
};

const getTickets = async (page: Number, status: string, accessToken: string, cancelToken: CancelToken) => {
    const response = await axios.get(API_URL + `GetAllTickets?page=${page}&status=${status}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cancelToken: cancelToken,
    });
    return response;
};

const getTotalTickets = async (status: string, accessToken: string, cancelToken: CancelToken) => {
    const response = await axios.get(API_URL + `GetTotalTickets?status=${status}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cancelToken: cancelToken,
    });
    return response;
};

const claimTicket = async (ticketId: string, accessToken: string) => {
    const response = await axios.put(
        API_URL + "ClaimTicket",
        {
            ticketId: ticketId,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response;
};

const unclaimTicket = async (ticketId: string, accessToken: string) => {
    const response = await axios.put(
        API_URL + "UnclaimTicket",
        {
            ticketId: ticketId,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response;
};

const resolveTicket = async (ticketId: string, accessToken: string) => {
    const response = await axios.put(
        API_URL + "ResolveTicket",
        {
            ticketId: ticketId,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response;
};

const openTicket = async (ticketId: string, accessToken: string) => {
    const response = await axios.put(
        API_URL + "OpenTicket",
        {
            ticketId: ticketId,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response;
};

const cancelTicket = async (ticketId: string, accessToken: string) => {
    const response = await axios.put(
        API_URL + "CancelTicket",
        {
            ticketId: ticketId,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response;
};

const TicketService = {
    getTicket,
    createTicket,
    claimTicket,
    unclaimTicket,
    resolveTicket,
    openTicket,
    cancelTicket,
    getTickets,
    getTotalTickets,
};

export default TicketService;

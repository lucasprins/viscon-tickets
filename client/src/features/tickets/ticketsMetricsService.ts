import axios, { CancelToken } from "axios";

const API_URL = "https://localhost:7295/api/ticket/";

const getTotalTicketsByUser = async (accessToken: string, cancelToken: CancelToken) => {
    const response = await axios.get(API_URL + "GetTotalTicketsByUser", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cancelToken: cancelToken,
    });
    return response;
};

const getTotalTicketsThisWeek = async (accessToken: string, cancelToken: CancelToken) => {
    const response = await axios.get(API_URL + "GetTotalTicketsThisWeek", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cancelToken: cancelToken,
    });
    return response;
};

const TicketsMetricsService = {
    getTotalTicketsByUser,
    getTotalTicketsThisWeek,
};

export default TicketsMetricsService;

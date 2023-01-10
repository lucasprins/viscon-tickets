import axios, { CancelToken } from "axios";
import { createTicketType, userType } from "../../utils/types";
import { authHeader } from "../auth/authHeader";

const API_URL = `${process.env.REACT_APP_API_URL}ticket/`;

const createTicket = async (ticket: createTicketType, user: userType, files: { url: string, key: string }[]) => {
  if(ticket.machine?.id === "") {
    ticket.machine = undefined;
  }
  const response = await axios.post(
    API_URL + "CreateTicket",
    {
      phoneNumber: ticket.phoneNumber,
      issueType: ticket.issueType,
      issue: ticket.issue,
      actionExpected: ticket.actionExpected,
      actionPerformed: ticket.actionPerformed,
      extraInfo: ticket.extraInfo,
      attachments: files,
      companyMachineId: ticket.machine?.id,
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

const addSolution = async (ticketId: string, accessToken: string, solution: string) => {
  const response = await axios.put(API_URL + "AddSolution/", 
  {
    ticketId: ticketId,
    solution: solution,
  },
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
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

const getTickets = async (page: Number, status: string, cancelToken: CancelToken) => {
  const response = await axios.get(API_URL + `GetAllTickets?page=${page}&status=${status}`, {
    headers: authHeader(),
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

const cancelTicket = async (ticketId: string, cancelReason: string) => {
  const response = await axios.put(
    API_URL + "CancelTicket",
    {
      ticketId: ticketId,
      cancelReason: cancelReason,
    },
    {
      headers: authHeader(),
    }
  );
  return response;
};

const changePriority = async (ticketId: string, priority: string) => {
  const response = await axios.put(
    API_URL + "ChangePriority/" + ticketId + "?priority=" + priority,
    {},
    {
      headers: authHeader(),
    }
  );

  return response;
}

const TicketService = {
  getTicket,
  createTicket,
  claimTicket,
  unclaimTicket,
  resolveTicket,
  openTicket,
  cancelTicket,
  getTickets,
  addSolution,
  changePriority
};

export default TicketService;

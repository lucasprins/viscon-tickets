using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOS;

namespace server.Services.TicketService
{
    public interface ITicketService
    {
        Task<GetTicketDTO> CreateGetTicketDTO(Ticket ticket);

        Task<ServiceResponse<GetTicketDTO>> GetTicketById(Guid id);
        Task<ServiceResponse<GetTicketsDTO>> GetAllTickets(int page, Status? status);

        Task<ServiceResponse<bool>> CreateTicket(CreateTicketDTO newTicket);

        // These can all be refactored to one UpdateTicket method
        Task<ServiceResponse<GetTicketDTO>> ClaimTicket(TicketIdDTO ticketToClaim);
        Task<ServiceResponse<GetTicketDTO>> UnclaimTicket(TicketIdDTO ticketToUnclaim);
        Task<ServiceResponse<GetTicketDTO>> ResolveTicket(TicketIdDTO ticketToResolve);
        Task<ServiceResponse<GetTicketDTO>> OpenTicket(TicketIdDTO ticketToOpen);
        Task<ServiceResponse<GetTicketDTO>> CancelTicket(CancelTicketDTO ticketToCancel);

        Task<ServiceResponse<GetTicketDTO>> AddSolution(AddTicketSolutionDTO solution);
        Task<ServiceResponse<GetTicketDTO>> ChangePriority(Guid ticketID, Priority priority);

    }
}
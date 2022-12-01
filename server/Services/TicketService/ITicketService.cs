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

        Task<ServiceResponse<GetTicketDTO>> CreateTicket(CreateTicketDTO newTicket);

        Task<ServiceResponse<GetTicketDTO>> ClaimTicket(TicketIdDTO ticketToClaim);
        Task<ServiceResponse<GetTicketDTO>> UnclaimTicket(TicketIdDTO ticketToUnclaim);
        Task<ServiceResponse<GetTicketDTO>> ResolveTicket(TicketIdDTO ticketToResolve);
        Task<ServiceResponse<GetTicketDTO>> OpenTicket(TicketIdDTO ticketToOpen);
        Task<ServiceResponse<GetTicketDTO>> CancelTicket(TicketIdDTO ticketToCancel);

        Task<ServiceResponse<GetTicketDTO>> AddSolution(AddSolutionDTO solution);
    }
}
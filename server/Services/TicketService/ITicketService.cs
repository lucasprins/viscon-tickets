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
        Task<ServiceResponse<GetTicketDTO>> CreateTicket(CreateTicketDTO newTicket);
        Task<ServiceResponse<GetTicketDTO>> UpdateTicket();

        Task<ServiceResponse<GetTicketDTO>> ClaimTicket(Guid ticketId);
    }
}
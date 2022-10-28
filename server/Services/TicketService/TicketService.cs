using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.Services.AuthService;

namespace server.Services.TicketService
{
    public class TicketService : ITicketService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IAuthService _authService;

        public TicketService(IMapper mapper, DataContext context, IAuthService authService)
        {
            _mapper = mapper;
            _context = context;
            _authService = authService;
        }

        public async Task<GetTicketDTO> CreateGetTicketDTO(Ticket ticket)
        {
            var ticketDTO = _mapper.Map<GetTicketDTO>(ticket);
            ticketDTO.Creator = _mapper.Map<GetTicketUserDTO>(await _context.Users.FirstOrDefaultAsync(u => u.Id == ticket.CreatorId));
            ticketDTO.Assignee = _mapper.Map<GetTicketUserDTO>(await _context.Users.FirstOrDefaultAsync(u => u.Id == ticket.AssigneeId));
            ticketDTO.Company = _mapper.Map<GetCompanyDTO>(await _context.Companies.FirstOrDefaultAsync(c => c.Id == ticket.CompanyId));

            var ticketMachine = await _context.Machines.FirstOrDefaultAsync(m => m.Id == ticket.MachineId);
            ticketDTO.MachineName = ticketMachine != null ? ticketMachine.Name : null;

            return ticketDTO;
        }

        public async Task<ServiceResponse<GetTicketDTO>> CreateTicket(CreateTicketDTO newTicket)
        {
            ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();
            try
            {
                var ticket = _mapper.Map<Ticket>(newTicket);
                bool noExistingTickets = _context.Tickets.Count() == 0;

                ticket.Id = Guid.NewGuid();
                ticket.TicketNumber = noExistingTickets ? 1 : _context.Tickets.Max(t => t.TicketNumber) + 1;
                ticket.CreationDate = DateTime.UtcNow;
                ticket.Status = Status.Open;
                ticket.Priority = Priority.Medium;

                try
                {
                    serviceResponse.Data = await CreateGetTicketDTO(ticket);
                }
                catch (Exception ex)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Unable to return the ticket that was just created.";
                    System.Console.WriteLine(ex.Message);
                    return serviceResponse;
                }

                _context.Tickets.Add(ticket);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Unable to create ticket with given data.";
                System.Console.WriteLine(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetTicketDTO>> GetTicketById(Guid id)
        {
            ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();
            var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

            try
            {
                var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == id);

                if (ticket == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Ticket not found.";
                    return serviceResponse;
                }

                if (requestUser == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Requesting user not found.";
                    return serviceResponse;
                }

                if (!(requestUser.CompanyId == ticket.CompanyId || (requestUser.Role == Role.VisconAdmin || requestUser.Role == Role.VisconEmployee)))
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "You are not authorized to view this ticket.";
                    return serviceResponse;
                }

                serviceResponse.Data = await CreateGetTicketDTO(ticket);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Unable to get ticket with given id.";
                System.Console.WriteLine(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetTicketDTO>>> GetAllTickets()
        {
            ServiceResponse<List<GetTicketDTO>> serviceResponse = new ServiceResponse<List<GetTicketDTO>>();
            try
            {
                var tickets = await _context.Tickets.ToListAsync();
                serviceResponse.Data = new List<GetTicketDTO>();

                foreach (var ticket in tickets)
                {
                    serviceResponse.Data.Add(await CreateGetTicketDTO(ticket));
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Unable to get all tickets.";
                System.Console.WriteLine(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetTicketDTO>> ClaimTicket(TicketIdDTO ticketToClaim)
        {
            ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

            System.Console.WriteLine("Claiming ticket with id: " + ticketToClaim.TicketId);

            if (user == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "User not found.";
                return serviceResponse;
            }

            try
            {
                var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == ticketToClaim.TicketId);
                if (ticket == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Ticket not found.";
                    return serviceResponse;
                }
                if (ticket.Status != Status.Open)
                {
                    serviceResponse.Data = await CreateGetTicketDTO(ticket);
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Ticket has already been claimed.";
                    return serviceResponse;
                }

                ticket.AssigneeId = user.Id;
                ticket.Status = Status.InProgress;
                _context.Tickets.Update(ticket);
                await _context.SaveChangesAsync();

                serviceResponse.Data = await CreateGetTicketDTO(ticket);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Unable to claim ticket with given id.";
                System.Console.WriteLine(ex.Message);
            }

            return serviceResponse;
        }

        public Task<ServiceResponse<GetTicketDTO>> ResolveTicket(Guid ticketId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetTicketDTO>> CancelTicket(Guid ticketId)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<GetTicketDTO>> UnclaimTicket(TicketIdDTO ticketToUnclaim)
        {
            ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

            System.Console.WriteLine("Unclaiming ticket with id: " + ticketToUnclaim.TicketId);

            if (user == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "User not found.";
                return serviceResponse;
            }

            try
            {
                var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == ticketToUnclaim.TicketId);
                if (ticket == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Ticket not found.";
                    return serviceResponse;
                }
                if (ticket.AssigneeId == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Ticket has not been claimed yet.";
                    return serviceResponse;
                }

                ticket.AssigneeId = null;
                ticket.Status = Status.Open;
                _context.Tickets.Update(ticket);
                await _context.SaveChangesAsync();

                serviceResponse.Data = await CreateGetTicketDTO(ticket);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Unable to unclaim ticket with given id.";
                System.Console.WriteLine(ex.Message);
            }

            return serviceResponse;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.Enums;
using server.Services.AuthService;
using server.Services.EmailService;

namespace server.Services.TicketService
{
  public class TicketService : ITicketService
  {
    private readonly IMapper _mapper;
    private readonly DataContext _context;
    private readonly IAuthService _authService;
    private readonly IEmailService _emailService;

    public TicketService(IMapper mapper, DataContext dataContext, IAuthService authService, IEmailService emailService)
    {
      _mapper = mapper;
      _context = dataContext;
      _authService = authService;
      _emailService = emailService;
    }

    public async Task<GetTicketDTO> CreateGetTicketDTO(Ticket ticket)
    {
      var ticketDTO = _mapper.Map<GetTicketDTO>(ticket);
      ticketDTO.Creator = _mapper.Map<GetTicketUserDTO>(await _context.Users.FirstOrDefaultAsync(u => u.Id == ticket.CreatorId));
      ticketDTO.Assignee = _mapper.Map<GetTicketUserDTO>(await _context.Users.FirstOrDefaultAsync(u => u.Id == ticket.AssigneeId));
      ticketDTO.Company = _mapper.Map<GetCompanyDTO>(await _context.Companies.FirstOrDefaultAsync(c => c.Id == ticket.CompanyId));

      var ticketMachine = await _context.CompanyMachines.FirstOrDefaultAsync(cm => cm.CompanyId == ticket.CompanyId && cm.Id == ticket.CompanyMachineId);
      ticketDTO.MachineName = ticketMachine != null ? ticketMachine.Name : null;

      return ticketDTO;
    }

    public async Task<ServiceResponse<bool>> CreateTicket(CreateTicketDTO newTicket)
    {
      ServiceResponse<bool> serviceResponse = new ServiceResponse<bool>();
      try
      {
        System.Console.WriteLine("TICKET MACHINE: " + newTicket.CompanyMachineId);
        var ticket = new Ticket();
        bool noExistingTickets = _context.Tickets.Count() == 0;

        ticket.Id = Guid.NewGuid();
        ticket.TicketNumber = noExistingTickets ? 1 : _context.Tickets.Max(t => t.TicketNumber) + 1;
        ticket.CreationDate = DateTime.UtcNow;
        ticket.Status = Status.Open;
        ticket.Priority = Priority.Medium;
        ticket.IssueType = newTicket.IssueType;
        ticket.Issue = newTicket.Issue;
        ticket.ActionExpected = newTicket.ActionExpected;
        ticket.ActionPerformed = newTicket.ActionPerformed;
        ticket.ExtraInfo = newTicket.ExtraInfo;
        ticket.CreatorId = newTicket.CreatorId;
        ticket.PhoneNumber = newTicket.PhoneNumber;
        ticket.CompanyId = newTicket.CompanyId;
        ticket.CompanyMachineId = newTicket.CompanyMachineId;
        ticket.Attachments = new List<Attachment>();


        // for each ticket in newticket.attachments create an attachment and store it in the database
        if (newTicket.Attachments != null)
        {
          var ticketAttachments = new List<Attachment>();
          foreach (var attachment in newTicket.Attachments)
          {
            var newAttachment = new Attachment();
            newAttachment.Id = Guid.NewGuid();
            newAttachment.TicketId = ticket.Id;
            newAttachment.URL = attachment.URL;
            newAttachment.Key = attachment.Key;
            newAttachment.Type = AttachmentType.TicketCreated;

            ticket.Attachments.Add(newAttachment);
          }
          _context.Attachments.AddRange(ticketAttachments);
        }

        _context.Tickets.Add(ticket);
        await _emailService.SendNewTicketEmail(ticket);
        await _context.SaveChangesAsync();
        serviceResponse.Data = true;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to create ticket with given data.";
        System.Console.WriteLine(ex.Message);
      }

      // TODO: Stuur een notificatie naar alle viscon medewerkers
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

        if (ticket.Solution == null)
        {
          ticket.Solution = "";
        }

        var ticketDTO = await CreateGetTicketDTO(ticket);
        List<Attachment> ticketAttachments = await _context.Attachments.Where(a => a.TicketId == ticket.Id).ToListAsync();

        ticketDTO.Attachments = _mapper.Map<List<AttachmentDTO>>(ticketAttachments);

        serviceResponse.Data = ticketDTO;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to get ticket with given id.";
        System.Console.WriteLine(ex.Message);
      }

      return serviceResponse;
    }

    public async Task<ServiceResponse<GetTicketsDTO>> GetAllTickets(int page, Status? status)
    {
      ServiceResponse<GetTicketsDTO> serviceResponse = new ServiceResponse<GetTicketsDTO>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      int pageSize = 10;
      int skip = (page - 1) * pageSize;

      System.Console.WriteLine("PAGES: " + page + " " + pageSize + " " + skip);
      System.Console.WriteLine("STATUS: " + status);
      System.Console.WriteLine("REQUEST USER: " + requestUser?.FirstName);

      try
      {
        if (requestUser == null)
        {
          serviceResponse.Success = false;
          serviceResponse.Message = "Requesting user not found.";
          return serviceResponse;
        }

        IQueryable<Ticket> tickets = _context.Tickets.Select(ticket => ticket);
        var ticketsDTO = new GetTicketsDTO();
        ticketsDTO.Tickets = new List<GetTicketDTO>();

        if (status != null)
          tickets = tickets.Where(ticket => ticket.Status == status);

        if (requestUser.Role != Role.VisconAdmin && requestUser.Role != Role.VisconEmployee)
          tickets = tickets.Where(ticket => ticket.CompanyId == requestUser.CompanyId);

        tickets = tickets
        .OrderBy(ticket => ticket.Status)
        .ThenBy(ticket => ticket.Priority)
        .ThenByDescending(ticket => ticket.CreationDate)
        .Skip(skip)
        .Take(pageSize)
        .Select(ticket => ticket);

        List<Ticket> ticketsList = await tickets.ToListAsync();
        List<GetTicketDTO> ticketsListConverted = new List<GetTicketDTO>();
        try
        {
          foreach (Ticket ticket in ticketsList)
            ticketsListConverted.Add(await CreateGetTicketDTO(ticket));
        }
        catch
        {
          serviceResponse.Success = false;
          serviceResponse.Message = "Unable to return the tickets.";
          return serviceResponse;
        }

        ticketsDTO.Tickets = ticketsListConverted;

        if (requestUser.Role == Role.VisconAdmin || requestUser.Role == Role.VisconEmployee)
        {
          ticketsDTO.UnresolvedTickets = _context.Tickets.Where(t => t.Status == Status.Open || t.Status == Status.InProgress).Count();
          ticketsDTO.OpenTickets = _context.Tickets.Count(t => t.Status == Status.Open);
          ticketsDTO.YourTickets = _context.Tickets.Count(t => t.AssigneeId == requestUser.Id && t.Status == Status.InProgress);
        }
        else
        {
          ticketsDTO.UnresolvedTickets = _context.Tickets.Where(t => t.CompanyId == requestUser.CompanyId && (t.Status == Status.Open || t.Status == Status.InProgress)).Count();
          ticketsDTO.OpenTickets = _context.Tickets.Count(t => t.CompanyId == requestUser.CompanyId && t.Status == Status.Open);
          ticketsDTO.YourTickets = _context.Tickets.Count(t => t.CreatorId == requestUser.Id && (t.Status == Status.InProgress || t.Status == Status.Open));
        }

        serviceResponse.Data = ticketsDTO;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to get tickets.";
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
        if (ticket.AssigneeId != null)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket already claimed.";
          return serviceResponse;
        }
        if (ticket.Status == Status.Cancelled)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket is cancelled.";
          return serviceResponse;
        }

        ticket.AssigneeId = user.Id;
        ticket.Status = Status.InProgress;
        _context.Tickets.Update(ticket);
        await _context.SaveChangesAsync();

        var ticketDTO = await CreateGetTicketDTO(ticket);
        List<Attachment> ticketAttachments = await _context.Attachments.Where(a => a.TicketId == ticket.Id).ToListAsync();

        ticketDTO.Attachments = _mapper.Map<List<AttachmentDTO>>(ticketAttachments);

        serviceResponse.Data = ticketDTO;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to claim ticket with given id.";
        System.Console.WriteLine(ex.Message);
      }

      return serviceResponse;
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
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has not been claimed yet.";
          return serviceResponse;
        }
        if (ticket.Status == Status.Resolved)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has already been resolved.";
          return serviceResponse;
        }
        if (ticket.Status == Status.Cancelled)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has been cancelled.";
          return serviceResponse;
        }

        ticket.AssigneeId = null;
        ticket.Status = Status.Open;
        _context.Tickets.Update(ticket);
        await _context.SaveChangesAsync();

        var ticketDTO = await CreateGetTicketDTO(ticket);
        List<Attachment> ticketAttachments = await _context.Attachments.Where(a => a.TicketId == ticket.Id).ToListAsync();

        ticketDTO.Attachments = _mapper.Map<List<AttachmentDTO>>(ticketAttachments);

        serviceResponse.Data = ticketDTO;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to unclaim ticket with given id.";
        System.Console.WriteLine(ex.Message);
      }

      return serviceResponse;
    }

    public async Task<ServiceResponse<GetTicketDTO>> ResolveTicket(TicketIdDTO ticketToResolve)
    {
      ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      System.Console.WriteLine("Resolving ticket with id: " + ticketToResolve.TicketId);

      if (user == null)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "User not found.";
        return serviceResponse;
      }

      try
      {
        var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == ticketToResolve.TicketId);
        if (ticket == null)
        {
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket not found.";
          return serviceResponse;
        }
        if (ticket.AssigneeId == null)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has not been claimed yet.";
          return serviceResponse;
        }
        if (ticket.Status == Status.Resolved)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has already been resolved.";
          return serviceResponse;
        }
        if (ticket.Status == Status.Cancelled)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has been cancelled.";
          return serviceResponse;
        }

        ticket.Status = Status.Resolved;
        _context.Tickets.Update(ticket);
        await _context.SaveChangesAsync();

        var ticketDTO = await CreateGetTicketDTO(ticket);
        List<Attachment> ticketAttachments = await _context.Attachments.Where(a => a.TicketId == ticket.Id).ToListAsync();

        ticketDTO.Attachments = _mapper.Map<List<AttachmentDTO>>(ticketAttachments);

        serviceResponse.Data = ticketDTO;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to resolve ticket with given id.";
        System.Console.WriteLine(ex.Message);
      }

      return serviceResponse;
    }

    public async Task<ServiceResponse<GetTicketDTO>> OpenTicket(TicketIdDTO ticketToOpen)
    {

      ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      System.Console.WriteLine("Resolving ticket with id: " + ticketToOpen.TicketId);

      if (user == null)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "User not found.";
        return serviceResponse;
      }

      try
      {
        var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == ticketToOpen.TicketId);
        if (ticket == null)
        {
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket not found.";
          return serviceResponse;
        }
        if (ticket.Status == Status.Cancelled)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has been cancelled.";
          return serviceResponse;
        }
        if (ticket.AssigneeId == null)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has not been claimed yet.";
          return serviceResponse;
        }
        if (ticket.Status != Status.Resolved)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has not been resolved yet.";
          return serviceResponse;
        }

        ticket.Status = Status.InProgress;
        _context.Tickets.Update(ticket);
        await _context.SaveChangesAsync();

        var ticketDTO = await CreateGetTicketDTO(ticket);
        List<Attachment> ticketAttachments = await _context.Attachments.Where(a => a.TicketId == ticket.Id).ToListAsync();

        ticketDTO.Attachments = _mapper.Map<List<AttachmentDTO>>(ticketAttachments);

        serviceResponse.Data = ticketDTO;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to re-open ticket with given id.";
        System.Console.WriteLine(ex.Message);
      }

      return serviceResponse;
    }

    public async Task<ServiceResponse<GetTicketDTO>> CancelTicket(CancelTicketDTO ticketToCancel)
    {
      ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      System.Console.WriteLine("Resolving ticket with id: " + ticketToCancel.TicketId);

      if (user == null)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "User not found.";
        return serviceResponse;
      }

      try
      {
        var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == ticketToCancel.TicketId);
        if (ticket == null)
        {
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket not found.";
          return serviceResponse;
        }
        if (ticket.CompanyId != user.CompanyId)
        {
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket does not belong to your company.";
          return serviceResponse;
        }
        if (ticket.Status == Status.Cancelled)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has already been cancelled";
          return serviceResponse;
        }
        if (ticket.Status == Status.Resolved)
        {
          serviceResponse.Data = await CreateGetTicketDTO(ticket);
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket has already been resolved.";
          return serviceResponse;
        }

        ticket.Status = Status.Cancelled;
        ticket.CancelReason = ticketToCancel.CancelReason;
        _context.Tickets.Update(ticket);
        await _context.SaveChangesAsync();

        var ticketDTO = await CreateGetTicketDTO(ticket);
        List<Attachment> ticketAttachments = await _context.Attachments.Where(a => a.TicketId == ticket.Id).ToListAsync();

        ticketDTO.Attachments = _mapper.Map<List<AttachmentDTO>>(ticketAttachments);

        serviceResponse.Data = ticketDTO;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to cancel ticket with given id.";
        System.Console.WriteLine(ex.Message);
      }

      return serviceResponse;
    }

    public async Task<ServiceResponse<GetTicketDTO>> AddSolution(AddTicketSolutionDTO solution)
    {
      ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();
      var requestingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestingUser == null)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Requesting user not found.";
        return serviceResponse;
      }

      try
      {
        var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == solution.TicketId);
        if (ticket == null)
        {
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket not found.";
          return serviceResponse;
        }

        ticket.Solution = solution.Solution;
        _context.Tickets.Update(ticket);
        await _context.SaveChangesAsync();

        var ticketDTO = await CreateGetTicketDTO(ticket);
        List<Attachment> ticketAttachments = await _context.Attachments.Where(a => a.TicketId == ticket.Id).ToListAsync();

        ticketDTO.Attachments = _mapper.Map<List<AttachmentDTO>>(ticketAttachments);

        serviceResponse.Data = ticketDTO;
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to add solution to ticket with given id.";
        System.Console.WriteLine(ex.Message);
      }

      return serviceResponse;
    }

    public async Task<ServiceResponse<GetTicketDTO>> ChangePriority(Guid ticketID, Priority priority)
    {
      ServiceResponse<GetTicketDTO> serviceResponse = new ServiceResponse<GetTicketDTO>();

      try
      {
        var ticket = _context.Tickets.FirstOrDefault(t => t.Id == ticketID);
        if (ticket == null)
        {
          serviceResponse.Success = false;
          serviceResponse.Message = "Ticket not found.";
          return serviceResponse;
        }

        ticket.Priority = priority;
        _context.Tickets.Update(ticket);
        await _context.SaveChangesAsync();
        var ticketDTO = await CreateGetTicketDTO(ticket);
        List<Attachment> ticketAttachments = await _context.Attachments.Where(a => a.TicketId == ticket.Id).ToListAsync();

        ticketDTO.Attachments = _mapper.Map<List<AttachmentDTO>>(ticketAttachments);

        serviceResponse.Data = ticketDTO;
      }
      catch
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Unable to change priority of ticket with given id.";
      }

      return serviceResponse;
    }
  }
}
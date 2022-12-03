using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOS;
using server.Services.TicketService;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet("GetTicket/{id}")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> GetTicket(Guid id)
        {
            return Ok(await _ticketService.GetTicketById(id));
        }

        [HttpGet("GetAllTickets"), Authorize(Roles = "VisconAdmin, VisconEmployee, CustomerAdmin, CustomerEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketsDTO>>> GetAllTickets(int page, Status? status = null)
        {
            return Ok(await _ticketService.GetAllTickets(page, status));
        }

        [HttpPost("CreateTicket"), Authorize(Roles = "CustomerAdmin, CustomerEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> CreateTicket(CreateTicketDTO newTicket)
        {
            return Ok(await _ticketService.CreateTicket(newTicket));
        }

        [HttpPut("ClaimTicket"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> ClaimTicket(TicketIdDTO ticketToClaim)
        {
            return Ok(await _ticketService.ClaimTicket(ticketToClaim));
        }

        [HttpPut("UnclaimTicket"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> UnclaimTicket(TicketIdDTO ticketToUnclaim)
        {
            return Ok(await _ticketService.UnclaimTicket(ticketToUnclaim));
        }

        [HttpPut("ResolveTicket"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> ResolveTicket(TicketIdDTO ticketToResolve)
        {
            return Ok(await _ticketService.ResolveTicket(ticketToResolve));
        }

        [HttpPut("OpenTicket"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> OpenTicket(TicketIdDTO ticketToOpen)
        {
            return Ok(await _ticketService.OpenTicket(ticketToOpen));
        }

        [HttpPut("CancelTicket"), Authorize(Roles = "CustomerAdmin, CustomerEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> CancelTicket(CancelTicketDTO ticketToCancel)
        {
            return Ok(await _ticketService.CancelTicket(ticketToCancel));
        }

        [HttpPut("AddSolution/"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> AddSolution(AddSolutionDTO solution)
        {
            return Ok(await _ticketService.AddSolution(solution));
        }

        // ADD SOLUTION ATTACHMENT
    }
}
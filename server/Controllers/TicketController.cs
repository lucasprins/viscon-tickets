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
            Thread.Sleep(5000);
            return Ok(await _ticketService.GetTicketById(id));
        }

        [HttpGet("GetAllTickets"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<List<GetTicketDTO>>>> GetAllTickets()
        {
            return Ok(await _ticketService.GetAllTickets());
        }

        [HttpPost("CreateTicket"), Authorize(Roles = "CustomerAdmin, CustomerEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> CreateTicket(CreateTicketDTO newTicket)
        {
            return Ok(await _ticketService.CreateTicket(newTicket));
        }

        [HttpPut("ClaimTicket"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> ClaimTicket(TicketIdDTO ticketToClaim)
        {
            Thread.Sleep(5000);
            return Ok(await _ticketService.ClaimTicket(ticketToClaim));
        }

        [HttpPut("UnclaimTicket"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> UnclaimTicket(TicketIdDTO ticketToUnclaim)
        {
            Thread.Sleep(5000);
            return Ok(await _ticketService.UnclaimTicket(ticketToUnclaim));
        }

        [HttpPut("ResolveTicket"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> ResolveTicket(TicketIdDTO ticketToResolve)
        {
            Thread.Sleep(5000);
            return Ok(await _ticketService.ResolveTicket(ticketToResolve));
        }

        [HttpPut("OpenTicket"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> OpenTicket(TicketIdDTO ticketToOpen)
        {
            Thread.Sleep(5000);
            return Ok(await _ticketService.OpenTicket(ticketToOpen));
        }

        [HttpPut("CancelTicket"), Authorize(Roles = "CustomerAdmin, CustomerEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> CancelTicket(TicketIdDTO ticketToCancel)
        {
            Thread.Sleep(5000);
            return Ok(await _ticketService.CancelTicket(ticketToCancel));
        }
    }
}
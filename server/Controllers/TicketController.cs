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
    }
}
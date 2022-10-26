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

        [HttpGet("GetTicket/{id}"), Authorize]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> GetTicket(Guid id)
        {
            return Ok(await _ticketService.GetTicketById(id));
        }

        [HttpPost("CreateTicket")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> CreateTicket(CreateTicketDTO newTicket)
        {
            return Ok(await _ticketService.CreateTicket(newTicket));
        }

        [HttpPut("UpdateTicket")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> UpdateTicket()
        {
            return Ok(await _ticketService.UpdateTicket());
        }

        [HttpPut("ClaimTicket/"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetTicketDTO>>> ClaimTicket(Guid ticketId)
        {
            return Ok(await _ticketService.ClaimTicket(ticketId));
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Services.SolutionService;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolutionController : ControllerBase
    {
        private readonly ISolutionService _solutionService;

        public SolutionController(ISolutionService solutionService)
        {
            _solutionService = solutionService;
        }

        [HttpGet("GetSolutions/{issueId}"), Authorize]
        public async Task<IActionResult> GetSolutions(Guid issueId)
        {
            var response = await _solutionService.GetSolutions(issueId);
            if (response == null) return NotFound();
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [HttpPost("AddSolution"), Authorize(Roles = "VisconAdmin")]
        public async Task<IActionResult> AddSolution(AddSolutionDTO newSolution)
        {
            var response = await _solutionService.AddSolution(newSolution);
            if (response == null) return NotFound();
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [HttpDelete("DeleteSolution/{solutionId}"), Authorize(Roles = "VisconAdmin")]
        public async Task<IActionResult> DeleteSolution(Guid solutionId)
        {
            var response = await _solutionService.DeleteSolution(solutionId);
            if (response == null) return NotFound();
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }
    }
}
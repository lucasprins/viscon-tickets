using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Services.IssuesService;

namespace server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class IssueController : ControllerBase
  {
    private readonly IIssueService _issueService;

    public IssueController(IIssueService issueService)
    {
      _issueService = issueService;
    }

    [HttpGet("GetIssues/{machineId}"), Authorize]
    public async Task<ActionResult<ServiceResponse<List<GetIssueDTO>>>> GetIssues(Guid machineId)
    {
      var response = await _issueService.GetIssues(machineId);

      if (response.StatusCode == 401)
      {
        return Unauthorized(response);
      }

      return Ok(response);
    }

    [HttpPost("AddIssue"), Authorize(Roles = "VisconAdmin")]
    public async Task<ActionResult<ServiceResponse<List<GetIssueDTO>>>> AddIssue(AddIssueDTO newIssue)
    {
      var response = await _issueService.AddIssue(newIssue);

      if (response.StatusCode == 401)
      {
        return Unauthorized(response);
      }

      return Ok(response);
    }

    [HttpDelete("DeleteIssue/{id}"), Authorize(Roles = "VisconAdmin")]
    public async Task<ActionResult<ServiceResponse<List<GetIssueDTO>>>> DeleteIssue(Guid id)
    {
      var response = await _issueService.DeleteIssue(id);

      if (response.StatusCode == 401)
      {
        return Unauthorized(response);
      }

      return Ok(response);
    }

  }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Services.AuthService;

namespace server.Services.IssuesService
{
  public class IssueService : IIssueService
  {

    private readonly IDataIssue _dataIssue;
    private readonly IAuthService _authService;
    private readonly DataContext _context;

    public IssueService(IDataIssue dataIssue, IAuthService authService, DataContext context)
    {
      _dataIssue = dataIssue;
      _authService = authService;
      _context = context;
    }

    public async Task<ServiceResponse<List<GetIssueDTO>>> AddIssue(AddIssueDTO newIssue)
    {
      ServiceResponse<List<GetIssueDTO>> response = new ServiceResponse<List<GetIssueDTO>>();
      var requestingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestingUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found";
        response.StatusCode = 401;
        return response;
      }

      response.Data = await _dataIssue.AddIssue(newIssue);

      return response;
    }

    public async Task<ServiceResponse<List<GetIssueDTO>>> DeleteIssue(Guid id)
    {
      ServiceResponse<List<GetIssueDTO>> response = new ServiceResponse<List<GetIssueDTO>>();
      var requestingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestingUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found";
        response.StatusCode = 401;
        return response;
      }

      response.Data = await _dataIssue.DeleteIssue(id);

      return response;
    }

    public async Task<ServiceResponse<List<GetIssueDTO>>> GetIssues(Guid machineId)
    {
      ServiceResponse<List<GetIssueDTO>> response = new ServiceResponse<List<GetIssueDTO>>();
      var requestingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestingUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found";
        response.StatusCode = 401;
        return response;
      }

      response.Data = await _dataIssue.GetIssues(machineId);

      return response;
    }
  }
}
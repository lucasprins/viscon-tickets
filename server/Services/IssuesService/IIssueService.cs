using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.IssuesService
{
    public interface IIssueService
    {
        Task<ServiceResponse<List<GetIssueDTO>>> GetIssues(Guid machineId);
        Task<ServiceResponse<List<GetIssueDTO>>> AddIssue(AddIssueDTO newIssue);
        Task<ServiceResponse<List<GetIssueDTO>>> DeleteIssue(Guid id);
    }
}
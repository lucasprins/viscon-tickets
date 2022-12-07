using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Data
{
    public interface IDataIssue
    {
        Task<List<GetIssueDTO>> GetIssues(Guid machineId);
        Task<List<GetIssueDTO>> AddIssue(AddIssueDTO newIssue);
        Task<List<GetIssueDTO>> DeleteIssue(Guid id);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.SolutionService
{
  public interface ISolutionService
  {
    Task<ServiceResponse<List<GetSolutionDTO>>?> GetSolutions(Guid issueId);
    Task<ServiceResponse<List<GetSolutionDTO>>?> AddSolution(AddSolutionDTO newSolution);
    Task<ServiceResponse<List<GetSolutionDTO>>?> DeleteSolution(Guid solutionId);
  }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.SolutionService
{
  public class SolutionService : ISolutionService
  {
    private readonly IDataSolution _dataSolution;

    public SolutionService(IDataSolution dataSolution)
    {
      _dataSolution = dataSolution;
    }

    public async Task<ServiceResponse<List<GetSolutionDTO>>?> AddSolution(AddSolutionDTO newSolution)
    {
        var response = new ServiceResponse<List<GetSolutionDTO>>();
        response.Data = await _dataSolution.AddSolution(newSolution);
        return response;
    }

    public async Task<ServiceResponse<List<GetSolutionDTO>>?> DeleteSolution(Guid solutionId)
    {
        var response = new ServiceResponse<List<GetSolutionDTO>>();
        var data = await _dataSolution.DeleteSolution(solutionId);

        if (data == null)
        {
            response.Success = false;
            response.Message = "Solution not found";
            response.StatusCode = 404;
            return response;
        }

        response.Data = data;
        return response;
    }

    public async Task<ServiceResponse<List<GetSolutionDTO>>?> GetSolutions(Guid issueId)
    {
        var response = new ServiceResponse<List<GetSolutionDTO>>();
        response.Data = await _dataSolution.GetSolutions(issueId);
        return response;
    }
  }
}
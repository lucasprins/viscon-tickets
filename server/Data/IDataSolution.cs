using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Data
{
    public interface IDataSolution
    {
        Task<List<GetSolutionDTO>> GetSolutions(Guid issueId);
        Task<List<GetSolutionDTO>> AddSolution(AddSolutionDTO newSolution);
        Task<List<GetSolutionDTO>> DeleteSolution(Guid solutionId);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace server.Data
{
  public class DataSolution : IDataSolution
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public DataSolution(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<List<GetSolutionDTO>> AddSolution(AddSolutionDTO newSolution)
    {
      _context.Add(_mapper.Map<Solution>(newSolution));
      await _context.SaveChangesAsync();

      return await GetSolutions(newSolution.IssueId);
    }

    public async Task<List<GetSolutionDTO>> DeleteSolution(Guid solutionId)
    {
      try
      {
        var solution = await _context.Solutions.FirstOrDefaultAsync(s => s.Id == solutionId);

        if (solution == null) return null!;

        _context.Solutions.Remove(solution);
        await _context.SaveChangesAsync();

        var issueId = solution.IssueId;
        return await GetSolutions(issueId);
      }
      catch
      {
        return new List<GetSolutionDTO>();
      }
    }

    public async Task<List<GetSolutionDTO>> GetSolutions(Guid issueId)
    {
      try
      {
        var solutions = await _context.Solutions.Where(s => s.IssueId == issueId).ToListAsync();
        return solutions.Select(s => _mapper.Map<GetSolutionDTO>(s)).ToList();
      }
      catch
      {
        return new List<GetSolutionDTO>();
      }
    }
  }
}
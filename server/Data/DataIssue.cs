using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace server.Data
{
  public class DataIssue : IDataIssue
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public DataIssue(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public DataIssue() { }

    public async Task<List<GetIssueDTO>> GetIssues(Guid machineId)
    {
      try
      {
        return await _context.Issues.Where(i => i.MachineId == machineId).Select(i => _mapper.Map<GetIssueDTO>(i)).ToListAsync();
      }
      catch
      {
        return new List<GetIssueDTO>();
      }
    }

    public async Task<List<GetIssueDTO>> AddIssue(AddIssueDTO newIssue)
    {
      System.Console.WriteLine("ADDING ISSUE");
      try
      {
        var machine = await _context.Machines.FirstOrDefaultAsync(m => m.Id == newIssue.MachineId);

        if (machine == null)
          return new List<GetIssueDTO>();

        Issue issue = _mapper.Map<Issue>(newIssue);
        issue.Id = Guid.NewGuid();

        await _context.Issues.AddAsync(issue);
        await _context.SaveChangesAsync();

        return await GetIssues(issue.MachineId);
      }
      catch
      {
        return new List<GetIssueDTO>();
      }
    }

    public async Task<List<GetIssueDTO>> DeleteIssue(Guid issueId)
    {
      try
      {
        var issue = await _context.Issues.FirstOrDefaultAsync(i => i.Id == issueId);

        if (issue == null)
          return new List<GetIssueDTO>();

        _context.Issues.Remove(issue);
        await _context.SaveChangesAsync();

        return await GetIssues(issue.MachineId);
      }
      catch
      {
        return new List<GetIssueDTO>();
      }
    }
  }
}
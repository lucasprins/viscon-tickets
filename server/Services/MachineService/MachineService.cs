using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.Services.AuthService;

namespace server.Services.MachineService
{
  public class MachineService : IMachineService
  {

    private readonly DataContext _context;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;

    public MachineService(DataContext context, IAuthService authService, IMapper mapper)
    {
      _context = context;
      _authService = authService;
      _mapper = mapper;
    }

    public async Task<ServiceResponse<List<GetCompanyMachineJoinedDTO>>> AddCompanyMachine(AddCompanyMachineDTO newCompanyMachine)
    {
      ServiceResponse<List<GetCompanyMachineJoinedDTO>> response = new ServiceResponse<List<GetCompanyMachineJoinedDTO>>();

      try
      {
        CompanyMachine companyMachine = _mapper.Map<CompanyMachine>(newCompanyMachine);
        companyMachine.Id = Guid.NewGuid();
        await _context.CompanyMachines.AddAsync(companyMachine);
        await _context.SaveChangesAsync();

        var companyMachines = await _context.CompanyMachines.Where(cm => cm.CompanyId == newCompanyMachine.CompanyId).ToListAsync();
        var responseList = new List<GetCompanyMachineJoinedDTO>();
        foreach (CompanyMachine cm in companyMachines)
        {
          var machine = await _context.Machines.FirstOrDefaultAsync(m => m.Id == cm.MachineId);
          var machineDTO = _mapper.Map<GetMachineDTO>(machine);
          responseList.Add(new GetCompanyMachineJoinedDTO
          {
            Id = cm.Id,
            Name = cm.Name,
            CompanyId = cm.CompanyId,
            Machine = machineDTO
          });
        }

        response.Data = responseList.OrderBy(cm => cm.Name).ToList();
      }
      catch (Exception ex)
      {
        response.Success = false;
        response.Message = ex.Message;
      }

      return response;
    }

    public async Task<ServiceResponse<List<GetMachineDTO>>> AddMachine(AddMachineDTO newMachine)
    {
      ServiceResponse<List<GetMachineDTO>> response = new ServiceResponse<List<GetMachineDTO>>();

      try
      {
        Machine machine = _mapper.Map<Machine>(newMachine);
        machine.Id = Guid.NewGuid();
        await _context.Machines.AddAsync(machine);
        await _context.SaveChangesAsync();
        response.Data = _context.Machines.Select(m => _mapper.Map<GetMachineDTO>(m)).ToList();
      }
      catch
      {
        response.Success = false;
        response.Message = "Unable to add machine";
      }

      return response;
    }

    public async Task<ServiceResponse<bool>> CompanyMachineExists(Guid companyId, string machineName)
    {
      ServiceResponse<bool> response = new ServiceResponse<bool>();
      response.Data = await _context.CompanyMachines.AnyAsync(cm => cm.CompanyId == companyId && cm.Name == machineName);
      return response;
    }

    // public async Task<ServiceResponse<GetCompanyMachineDTO>> GetCompanyMachineById(int id)
    // {
    //   throw new NotImplementedException();
    // }

    public async Task<ServiceResponse<List<GetCompanyMachineDTO>>> GetCompanyMachines()
    {
      ServiceResponse<List<GetCompanyMachineDTO>> response = new ServiceResponse<List<GetCompanyMachineDTO>>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestUser == null)
      {
        response.Success = false;
        response.Message = "User not found";
        return response;
      }

      try
      {
        var companyMachines = await _context.CompanyMachines.Where(cm => cm.CompanyId == requestUser.CompanyId).ToListAsync();
        response.Data = companyMachines.Select(cm => _mapper.Map<GetCompanyMachineDTO>(cm)).ToList();
      }
      catch
      {
        response.Success = false;
        response.Message = "Unable to get company machines";
      }

      return response;
    }

    public async Task<ServiceResponse<List<GetCompanyMachineJoinedDTO>>> GetCompanyMachinesJoined(Guid companyId)
    {
      ServiceResponse<List<GetCompanyMachineJoinedDTO>> response = new ServiceResponse<List<GetCompanyMachineJoinedDTO>>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found";
        return response;
      }

      try
      {
        var companyMachines = await _context.CompanyMachines.Where(cm => cm.CompanyId == companyId).ToListAsync();
        var responseList = new List<GetCompanyMachineJoinedDTO>();
        foreach (CompanyMachine cm in companyMachines)
        {
          var machine = await _context.Machines.FirstOrDefaultAsync(m => m.Id == cm.MachineId);
          var machineDTO = _mapper.Map<GetMachineDTO>(machine);
          responseList.Add(new GetCompanyMachineJoinedDTO
          {
            Id = cm.Id,
            Name = cm.Name,
            CompanyId = cm.CompanyId,
            Machine = machineDTO
          });
        }

        response.Data =  responseList.OrderBy(cm => cm.Name).ToList();
      }
      catch
      {
        response.Success = false;
        response.Message = "Unable to get company machines";
      }

      return response;
    }

    public async Task<ServiceResponse<GetMachineDTO>> GetMachineById(int id)
    {
      throw new NotImplementedException();
    }

    public async Task<ServiceResponse<List<GetMachineDTO>>> GetMachines()
    {
      ServiceResponse<List<GetMachineDTO>> response = new ServiceResponse<List<GetMachineDTO>>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found";
        return response;
      }

      try
      {
        if (requestUser.Role == Role.VisconAdmin || requestUser.Role == Role.VisconEmployee)
        {
          var machines = await _context.Machines.ToListAsync();
          response.Data = machines.Select(m => _mapper.Map<GetMachineDTO>(m)).ToList();
        }
        else
        {
          var companyMachines = await _context.CompanyMachines.Where(cm => cm.CompanyId == requestUser.CompanyId).ToListAsync();
          List<Machine> machines = new List<Machine>();

          foreach (var companyMachine in companyMachines)
          {
            var machine = await _context.Machines.FirstOrDefaultAsync(m => m.Id == companyMachine.MachineId);
            if (machine != null && !machines.Contains(machine))
              machines.Add(machine);
          }

          response.Data = machines.Select(m => _mapper.Map<GetMachineDTO>(m)).ToList();
        }
      }
      catch
      {
        response.Success = false;
        response.Message = "Unable to get machines";
      }

      return response;
    }
  }
}
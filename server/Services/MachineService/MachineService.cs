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
            if (machine != null)
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
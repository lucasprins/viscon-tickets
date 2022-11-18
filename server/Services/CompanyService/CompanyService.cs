using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.DTOS;
using server.Services.UserService;

namespace server.Services.CompanyService
{
  public class CompanyService : ICompanyService
  {
    private readonly IMapper _mapper;
    private readonly DataContext _context;
    private readonly IUserService _userService;

    public CompanyService(IMapper mapper, DataContext context, IUserService userService)
    {
      _mapper = mapper;
      _context = context;
      _userService = userService;
    }

    public async Task<ServiceResponse<List<GetCompanyDTO>>> AddCompany(AddCompanyDTO newCompany)
    {
      ServiceResponse<List<GetCompanyDTO>> serviceResponse = new ServiceResponse<List<GetCompanyDTO>>();

      var existingCompany = await _context.Companies.FirstOrDefaultAsync(c => c.Name.ToLower().Equals(newCompany.Name.ToLower()));

      if (existingCompany != null)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = "Company already exists.";
        return serviceResponse;
      }
      try
      {
        Company company = _mapper.Map<Company>(newCompany);
        company.Id = Guid.NewGuid();
        company.IsActive = true;
        await _context.Companies.AddAsync(company);
        await _userService.AddUser(new AddUserDTO
        {
          FirstName = newCompany.AdminUser.FirstName,
          Prefix = newCompany.AdminUser.Prefix,
          LastName = newCompany.AdminUser.LastName,
          Email = newCompany.AdminUser.Email,
          Role = newCompany.AdminUser.Role,
          CompanyId = company.Id
        });

        await _context.SaveChangesAsync();

        var machines = await _context.Machines.Where(m => m.BlueprintNumber == company.Id.ToString()).ToListAsync();
        System.Console.WriteLine("Machine count: " + machines.Count);
        foreach (var machine in machines)
        {
          await _context.CompanyMachines.AddAsync(new CompanyMachine
          {
            CompanyId = company.Id,
            MachineId = machine.Id
          });
        }

        await _context.SaveChangesAsync();
        serviceResponse.Data = await (_context.Companies.Select(c => _mapper.Map<GetCompanyDTO>(c))).ToListAsync();
      }
      catch (Exception ex)
      {
        serviceResponse.Success = false;
        serviceResponse.Message = ex.Message;
      }
      return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetCompanyDTO>>> GetAllCompanies()
    {
      ServiceResponse<List<GetCompanyDTO>> response = new ServiceResponse<List<GetCompanyDTO>>();
      try
      {
        List<Company> dbCompanies = await _context.Companies.ToListAsync();
        response.Data = (dbCompanies.Select(c => _mapper.Map<GetCompanyDTO>(c))).ToList();
      }
      catch (Exception ex)
      {
        response.Success = false;
        response.Message = ex.Message;
      }
      return response;
    }

    public async Task<ServiceResponse<GetCompanyDTO>> GetCompanyById(Guid id)
    {
      ServiceResponse<GetCompanyDTO> response = new ServiceResponse<GetCompanyDTO>();
      try
      {
        var dbCompany = await _context.Companies.FirstOrDefaultAsync(c => c.Id == id);
        if (dbCompany == null)
        {
          response.Success = false;
          response.Message = "Company not found.";
        }
        else
        {
          response.Data = _mapper.Map<GetCompanyDTO>(dbCompany);
        }
      }
      catch (Exception ex)
      {
        response.Success = false;
        response.Message = ex.Message;
      }

      return response;
    }

    public async Task<ServiceResponse<bool>> CompanyExists(string name)
    {
      ServiceResponse<bool> response = new ServiceResponse<bool>();
      try
      {
        response.Data = await _context.Companies.AnyAsync(c => c.Name.ToLower().Equals(name.ToLower()));
      }
      catch (Exception ex)
      {
        response.Success = false;
        response.Message = ex.Message;
      }

      return response;
    }
  }
}
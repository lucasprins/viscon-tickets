using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Services.MachineService;

namespace server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class MachineController : ControllerBase
  {
    private readonly IMachineService _machineService;

    public MachineController(IMachineService machineService)
    {
      _machineService = machineService;
    }

    [HttpGet("GetAllMachines"), Authorize(Roles = "VisconAdmin")]
    public async Task<ActionResult<ServiceResponse<List<GetMachineDTO>>>> GetAllMachines()
    {
      return Ok(await _machineService.GetMachines());
    }

    [HttpGet("GetMachine/{id}"), Authorize]
    public async Task<ActionResult<ServiceResponse<Machine>>> GetMachine(int id)
    {
      return Ok(await _machineService.GetMachineById(id));
    }

    [HttpPost("AddMachine"), Authorize(Roles = "VisconAdmin")]
    public async Task<ActionResult<ServiceResponse<List<GetMachineDTO>>>> AddMachine(AddMachineDTO newMachine)
    {
      return Ok(await _machineService.AddMachine(newMachine));
    }

    [HttpGet("GetAllCompanyMachines"), Authorize]
    public async Task<ActionResult<ServiceResponse<List<CompanyMachine>>>> GetAllCompanyMachines()
    {
      return Ok(await _machineService.GetCompanyMachines());
    }

    [HttpGet("GetCompanyMachinesJoined/{companyId}"), Authorize]
    public async Task<ActionResult<ServiceResponse<List<GetCompanyMachineJoinedDTO>>>> GetCompanyMachinesJoined(Guid companyId)
    {
      return Ok(await _machineService.GetCompanyMachinesJoined(companyId));
    }
  }
}
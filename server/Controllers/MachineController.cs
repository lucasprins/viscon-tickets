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

        [HttpGet("GetAllMachines"), Authorize]
        public async Task<ActionResult<ServiceResponse<List<Machine>>>> GetAllMachines()
        {
            return Ok(await _machineService.GetMachines());
        }

        [HttpGet("GetMachine/{id}"), Authorize]
        public async Task<ActionResult<ServiceResponse<Machine>>> GetMachine(int id)
        {
            return Ok(await _machineService.GetMachineById(id));
        }

        [HttpGet("GetAllCompanyMachines"), Authorize]
        public async Task<ActionResult<ServiceResponse<List<CompanyMachine>>>> GetAllCompanyMachines()
        {
            return Ok(await _machineService.GetCompanyMachines());
        }

        // [HttpGet("GetCompanyMachine/{id}"), Authorize]
        // public async Task<ActionResult<ServiceResponse<CompanyMachine>>> GetCompanyMachine(int id)
        // {
        //     return Ok(await _machineService.GetCompanyMachineById(id));
        // }
    }
}
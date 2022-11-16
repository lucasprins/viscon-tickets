using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOS;
using server.Services.CompanyService;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet("GetAllCompanies"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<List<GetCompanyDTO>>>> GetAllCompanies()
        {
            return Ok(await _companyService.GetAllCompanies());
        }

        [HttpGet("GetCompany/{id}"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<GetCompanyDTO>>> GetCompany(Guid id)
        {
            return Ok(await _companyService.GetCompanyById(id));
        }

        [HttpPost("AddCompany"), Authorize(Roles = "VisconAdmin, VisconEmployee")]
        public async Task<ActionResult<ServiceResponse<List<GetCompanyDTO>>>> AddCompany(AddCompanyDTO newCompany)
        {
            return Ok(await _companyService.AddCompany(newCompany));
        }

        [HttpGet("CompanyExists/{name}")]
        public async Task<ActionResult<ServiceResponse<bool>>> CompanyExists(string name)
        {
            return Ok(await _companyService.CompanyExists(name));
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOS.Company;
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

        [HttpGet("GetAllCompanies")]
        public async Task<ActionResult<ServiceResponse<List<GetCompanyDTO>>>> Get()
        {
            return Ok(await _companyService.GetAllCompanies());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<GetCompanyDTO>>> GetSingle(Guid id)
        {
            return Ok(await _companyService.GetCompanyById(id));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetCompanyDTO>>>> AddCompany(AddCompanyDTO newCompany)
        {
            return Ok(await _companyService.AddCompany(newCompany));
        }
    }
}
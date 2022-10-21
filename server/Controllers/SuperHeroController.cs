using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {

        private readonly DataContext _context;

        public CompanyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> Get(Guid id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }
            return Ok(company);
        }

        // Get all superheroes
        [HttpGet]
        public async Task<ActionResult<List<Company>>> Get()
        {
            return Ok(await _context.Companies.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Company>>> AddCompany()
        {
            _context.Companies.Add(new Company
            {
                Name = "Microsoft",
                Country = "USA",
                IsActive = true
            });
            await _context.SaveChangesAsync();
            return Ok(await _context.Companies.ToListAsync());
        }
    }
}
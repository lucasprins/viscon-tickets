using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.DTOS;

namespace server.Services.CompanyService
{
    public class CompanyService : ICompanyService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CompanyService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceResponse<List<GetCompanyDTO>>> AddCompany(AddCompanyDTO newCompany)
        {
            ServiceResponse<List<GetCompanyDTO>> serviceResponse = new ServiceResponse<List<GetCompanyDTO>>();
            try
            {
                Company company = _mapper.Map<Company>(newCompany);
                company.Id = Guid.NewGuid();
                await _context.Companies.AddAsync(company);
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
    }
}
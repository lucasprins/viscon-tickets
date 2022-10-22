using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOS.Company;
using server.DTOS;

namespace server.Services.CompanyService
{
    public interface ICompanyService
    {
        Task<ServiceResponse<List<GetCompanyDTO>>> GetAllCompanies();
        Task<ServiceResponse<GetCompanyDTO>> GetCompanyById(Guid id);
        Task<ServiceResponse<List<GetCompanyDTO>>> AddCompany(AddCompanyDTO newCompany);
    }
}
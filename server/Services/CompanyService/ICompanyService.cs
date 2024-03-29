using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOS;

namespace server.Services.CompanyService
{
    public interface ICompanyService
    {
        Task<ServiceResponse<List<GetCompanyDTO>>> GetAllCompanies();
        Task<ServiceResponse<GetCompanyDTO>> GetCompanyById(Guid id);
        Task<ServiceResponse<bool>> CompanyExists(string name);
        Task<ServiceResponse<List<GetCompanyDTO>>> AddCompany(AddCompanyDTO newCompany);

        Task<ServiceResponse<List<GetCompanyDTO>>> ToggleCompanyStatus(Guid id);
    }
}
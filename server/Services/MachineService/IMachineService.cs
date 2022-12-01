using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.MachineService
{
    public interface IMachineService
    {
        Task<ServiceResponse<List<GetMachineDTO>>> GetMachines();
        Task<ServiceResponse<GetMachineDTO>> GetMachineById(int id);
        Task<ServiceResponse<List<GetCompanyMachineDTO>>> GetCompanyMachines();
     //   Task<ServiceResponse<GetCompanyMachineDTO>> GetCompanyMachineById(int id);
    }
}
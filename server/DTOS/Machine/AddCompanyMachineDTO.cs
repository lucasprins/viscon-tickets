using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class AddCompanyMachineDTO
    {
        public string Name { get; set; } = null!;
        public Guid CompanyId { get; set; }
        public Guid MachineId { get; set; }
    }
}
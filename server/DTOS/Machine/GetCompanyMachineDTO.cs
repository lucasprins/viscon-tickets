using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
  public class GetCompanyMachineDTO
  {
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public Guid CompanyId { get; set; }
    public Guid MachineId { get; set; }
  }
}
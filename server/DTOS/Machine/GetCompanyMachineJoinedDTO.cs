using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
  public class GetCompanyMachineJoinedDTO
  {
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public Guid CompanyId { get; set; }
    public GetMachineDTO Machine { get; set; } = null!;
  }
}
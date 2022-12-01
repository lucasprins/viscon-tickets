using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
  public class GetMachineDTO
  {
    public Guid Id { get; set; }
    public string BlueprintNumber { get; set; } = null!;
    public string Type { get; set; } = null!;
  }
}
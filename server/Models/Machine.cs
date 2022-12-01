using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
  public class Machine
  {
    public Guid Id { get; set; }
    public string BlueprintNumber { get; set; } = null!;
    public string Type { get; set; } = null!;

    public List<CompanyMachine> CompanyMachines { get; set; } = null!;
    public List<Solution> Solutions { get; set; } = null!;
    public List<Ticket> Tickets { get; set; } = null!;
  }
}
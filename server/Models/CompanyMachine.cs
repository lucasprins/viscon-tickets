using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class CompanyMachine
    {
        public Guid CompanyId { get; set; }
        public Guid MachineId { get; set; }

        public Company Company { get; set; } = null!;
        public Machine Machine { get; set; } = null!;
    }
}
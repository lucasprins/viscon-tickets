using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Company
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Country { get; set; } = null!;
        public bool IsActive { get; set; }

        public List<CompanyMachine> CompanyMachines { get; set; } = null!;
    }
}
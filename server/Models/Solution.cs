using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Solution
    {
        public Guid Id { get; set; }
        public string Issue { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Language { get; set; } = null!;
        public Guid MachineId { get; set; }
        
        public Machine Machine { get; set; } = null!;
    }
}
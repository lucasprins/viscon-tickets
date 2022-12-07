using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Issue
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = null!;
        public Guid MachineId { get; set; }

        public Machine Machine { get; set; } = null!;
        public ICollection<Solution> Solutions { get; set; } = null!;
    }
}
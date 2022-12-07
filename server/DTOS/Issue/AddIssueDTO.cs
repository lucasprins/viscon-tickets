using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class AddIssueDTO
    {
        public Guid MachineId { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
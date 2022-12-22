using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class AddSolutionDTO
    {
        public string Description { get; set; } = null!;
        public Guid IssueId { get; set; }
    }
}
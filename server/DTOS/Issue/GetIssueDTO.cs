using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class GetIssueDTO
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = null!;
    }
}
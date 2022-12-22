using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Solution
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = null!;
        public Guid IssueId { get; set; }

        public Issue Issue { get; set; } = null!;
    }
}
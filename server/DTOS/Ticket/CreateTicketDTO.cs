using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class CreateTicketDTO
    {
        public string PhoneNumber { get; set; } = null!;

        public IssueType IssueType { get; set; }
        public string Issue { get; set; } = null!;
        public string ActionExpected { get; set; } = null!;
        public string ActionPerformed { get; set; } = null!;
        public string ExtraInfo { get; set; } = null!;

        public Guid CompanyMachineId { get; set; }
        public Guid CreatorId { get; set; }
        public Guid CompanyId { get; set; }
    }
}
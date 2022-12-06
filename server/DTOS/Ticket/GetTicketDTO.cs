using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOS;

namespace server.DTOS
{
    public class GetTicketDTO
    {
        public Guid Id { get; set; }
        public int TicketNumber { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public Status Status { get; set; }
        public Priority Priority { get; set; }

        public IssueType IssueType { get; set; }
        public string Issue { get; set; } = null!;
        public string ActionExpected { get; set; } = null!;
        public string ActionPerformed { get; set; } = null!;
        public string ExtraInfo { get; set; } = null!;
        public string Solution { get; set; } = null!;
        public string CancelReason { get; set; } = null!;

        public GetCompanyDTO Company { get; set; } = null!;
        public GetTicketUserDTO Creator { get; set; } = null!;
        public GetTicketUserDTO? Assignee { get; set; }
        public string? MachineName { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public int TicketNumber { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public Status Status { get; set; }
        public Priority Priority { get; set; }

        public string Issue { get; set; } = null!;
        public string ActionExpected { get; set; } = null!;
        public string ActionPerformed { get; set; } = null!;
        public string ExtraInfo { get; set; } = null!;
        public string? Solution { get; set; }

        public Guid CompanyMachineId { get; set; }
        public Guid CreatorId { get; set; }     // Is een customer employee/admin
        public Guid? AssigneeId { get; set; }    // Is een viscon employee/admin
        public Guid CompanyId { get; set; }

        public CompanyMachine CompanyMachine { get; set; } = null!;
        public User Creator { get; set; } = null!;
        public User? Assignee { get; set; } = null!;
        public Company Company { get; set; } = null!;


    }
}
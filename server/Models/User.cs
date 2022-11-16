using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string? Prefix { get; set; }
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public Role Role { get; set; }
        public bool IsActive { get; set; } = true;
        public Guid CompanyId { get; set; }

        public Company Company { get; set; } = null!;
        public List<Ticket> CreatedTickets { get; set; } = null!;
        public List<Ticket> AssignedTickets { get; set; } = null!;
        public List<Notification> Notifications { get; set; } = null!;
        public List<Token> Tokens { get; set; } = null!;
    }
}
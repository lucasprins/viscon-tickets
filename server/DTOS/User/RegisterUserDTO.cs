using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS.User
{
    public class RegisterUserDTO
    {
        public string FirstName { get; set; } = null!;
        public string? Prefix { get; set; }
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Password { get; set; } = null!;
        public bool IsActive { get; set; } = true;
        public Role Role { get; set; }
        public Guid CompanyId { get; set; }
    }
}
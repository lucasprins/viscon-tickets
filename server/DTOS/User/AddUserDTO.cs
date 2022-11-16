using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class AddUserDTO
    {
        public string FirstName { get; set; } = null!;
        public string? Prefix { get; set; }
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Role Role { get; set; }
        public Guid CompanyId { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOS;

namespace server.DTOS
{
    public class GetAuthenticatedUserDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string? Prefix { get; set; }
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public Role Role { get; set; }
        public bool IsActive { get; set; }
        public GetCompanyDTO Company { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS.User
{
    public class LoginUserDTO
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
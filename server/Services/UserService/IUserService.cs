using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<AddUserDTO>> AddUser(AddUserDTO newUser);
        Task<ServiceResponse<bool>> EmailExists(string email);
    }
}
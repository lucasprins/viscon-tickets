using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<List<GetUserDTO>>> AddUser(AddUserDTO newUser);
        Task<ServiceResponse<bool>> EmailExists(string email);
        Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers();
        Task<ServiceResponse<List<GetUserDTO>>> ToggleUserStatus(Guid id);
        Task<ServiceResponse<List<GetUserDTO>>> ChangeUserRole(Guid id);
        // Task<ServiceResponse<List<GetUserDTO>>> ChangePassword(Guid id);
        Task<ServiceResponse<List<GetUserDTO>>> ChangePhoneNumber(Guid id, string phoneNumber);
        Task<ServiceResponse<List<GetUserDTO>>> ChangeEmail(Guid id, string email);
    }
}
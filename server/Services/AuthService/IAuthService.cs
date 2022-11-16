using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOS;

namespace server.Services.AuthService
{
    public interface IAuthService
    {
        string GetUserRole();
        string GetUserEmail();
        string CreateToken(User user);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt);

        Task<ServiceResponse<GetUserDTO>> Register(RegisterDTO newUser);
        Task<ServiceResponse<GetAuthenticatedUserDTO>> Login(LoginUserDTO user);

        Task<ServiceResponse<GetUserDTO>> RegisterUser(RegisterUserDTO newUser, Guid registrationToken);

    }
}
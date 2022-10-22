using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOS.User;

namespace server.Services.AuthService
{
    public interface IAuthService
    {
        string CreateToken(User user);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt);

        Task<ServiceResponse<GetUserDTO>> Register(RegisterUserDTO newUser);
        Task<ServiceResponse<GetUserDTO>> Login(LoginUserDTO user);

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.TokenService
{
    public interface ITokenService
    {
        Task<ServiceResponse<bool>> VerifyToken(Guid token, TokenType tokenType);
    }
}
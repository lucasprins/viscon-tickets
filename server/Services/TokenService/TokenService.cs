using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.TokenService
{
  public class TokenService : ITokenService
  {
    private readonly DataContext _context;

    public TokenService(DataContext context)
    {
      _context = context;
    }

    public async Task<ServiceResponse<bool>> VerifyToken(Guid token, TokenType tokenType)
    {
        ServiceResponse<bool> response = new ServiceResponse<bool>();
        var databaseToken = await _context.Tokens.FirstOrDefaultAsync(t => t.TokenValue == token && t.TokenType == tokenType);

        if (databaseToken == null)
        {
            response.Success = false;
            response.Message = "Token not found";
            return response;
        }

        if (databaseToken.ExpirationDate < DateTime.Now)
        {
            response.Success = false;
            response.Message = "Token has expired";
            return response;
        }

        response.Message = "Token is valid";
        response.Data = true;
        return response;
    }
  }
}
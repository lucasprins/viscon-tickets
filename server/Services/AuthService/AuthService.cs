
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.DTOS;
using AutoMapper;

namespace server.Services.AuthService
{
  public class AuthService : IAuthService
  {
    private readonly IConfiguration _configuration;
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthService(IConfiguration configuration, DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
      _configuration = configuration;
      _context = context;
      _mapper = mapper;
      _httpContextAccessor = httpContextAccessor;
    }

    public string GetUserRole()
    {
      var result = string.Empty;
      if (_httpContextAccessor.HttpContext != null)
      {
        var user = _httpContextAccessor.HttpContext.User;
        if (user != null)
        {
          result = user.FindFirstValue(ClaimTypes.Role);
        }
      }
      return result;
    }

    public string GetUserEmail()
    {
      var result = string.Empty;
      if (_httpContextAccessor.HttpContext != null)
      {
        var user = _httpContextAccessor.HttpContext.User;
        if (user != null)
        {
          result = user.FindFirstValue(ClaimTypes.Name);
        }
      }
      return result;
    }

    public async Task<ServiceResponse<GetAuthenticatedUserDTO>> Login(LoginUserDTO user)
    {
      ServiceResponse<GetAuthenticatedUserDTO> response = new ServiceResponse<GetAuthenticatedUserDTO>();
      var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower().Equals(user.Email.ToLower()));
      if (dbUser == null)
      {
        response.Success = false;
        response.Message = "User not found.";
        return response;
      }

      var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == dbUser.CompanyId);
      if (company == null)
      {
        response.Success = false;
        response.Message = "Your company is not registered.";
        return response;
      }

      if (!company.IsActive)
      {
        response.Success = false;
        response.Message = "Your company has been deactivated";
        return response;
      }

      if (!dbUser.IsActive)
      {
        response.Success = false;
        response.Message = "Your account has been deactivated";
        return response;
      }

      if (dbUser.PasswordHash != null && dbUser.PasswordSalt != null)
      {
        if (!VerifyPasswordHash(user.Password, dbUser.PasswordHash, dbUser.PasswordSalt))
        {
          response.Success = false;
          response.Message = "Password is incorrect.";
          return response;
        }
      }
      else
      {
        response.Success = false;
        response.Message = "User has not registered yet.";
        return response;
      }

      var userCompany = await _context.Companies.Where(c => c.Id == dbUser.CompanyId).Select(c => _mapper.Map<GetCompanyDTO>(c)).FirstOrDefaultAsync();
      if (userCompany == null)
      {
        response.Success = false;
        response.Message = "UserCompany not found.";
        return response;
      }
      else
      {
        string userJWTToken = CreateToken(dbUser);
        // Token refreshToken = CreateRefreshToken(dbUser);
        // SetRefreshToken(refreshToken);

        response.Data = new GetAuthenticatedUserDTO
        {
          Id = dbUser.Id,
          FirstName = dbUser.FirstName,
          LastName = dbUser.LastName,
          Email = dbUser.Email,
          PhoneNumber = dbUser.PhoneNumber ?? string.Empty,
          Role = dbUser.Role,
          IsActive = dbUser.IsActive,
          Company = userCompany,
          AccessToken = userJWTToken
        };
      };
      return response;
    }

    // private Token CreateRefreshToken(User user)
    // {
    //   Token refreshToken = new Token
    //   {
    //     UserId = user.Id,
    //     TokenType = TokenType.REFRESH,
    //     TokenValue = Guid.NewGuid(),
    //     CreationDate = DateTime.UtcNow,
    //     ExpirationDate = DateTime.UtcNow.AddDays(7)
    //   };

    //   _context.Tokens.Add(refreshToken);
    //   _context.SaveChanges();
    //   return refreshToken;
    // }

    // private void SetRefreshToken(Token refreshToken)
    // {
    //   var cookieOptions = new CookieOptions
    //   {
    //     HttpOnly = true,
    //     Expires = refreshToken.ExpirationDate
    //   };

    //   if (_httpContextAccessor.HttpContext != null)
    //   {
    //     _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken.TokenValue.ToString(), cookieOptions);
    //   }
    // }

    public async Task<ServiceResponse<GetUserDTO>> Register(RegisterDTO newUser)
    {
      bool emailAlreadyExists = await _context.Users.AnyAsync(u => u.Email.ToLower().Equals(newUser.Email.ToLower()));
      if (emailAlreadyExists)
      {
        return new ServiceResponse<GetUserDTO>
        {
          Success = false,
          Message = "User with this email already exists."
        };
      }
      else
      {
        CreatePasswordHash(newUser.Password, out byte[] passwordHash, out byte[] passwordSalt);
        var company = await _context.Companies.FirstOrDefaultAsync(c => c.Id == newUser.CompanyId);
        if (company == null)
        {
          return new ServiceResponse<GetUserDTO>
          {
            Success = false,
            Message = "Company does not exist."
          };
        }
        else
        {
          User user = new User
          {
            Id = Guid.NewGuid(),
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email,
            PhoneNumber = newUser.PhoneNumber,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            Role = newUser.Role,
            CompanyId = company.Id

          };
          await _context.Users.AddAsync(user);
          await _context.SaveChangesAsync();

          ServiceResponse<GetUserDTO> response = new ServiceResponse<GetUserDTO>
          {
            Data = new GetUserDTO
            {
              Id = user.Id,
              FirstName = user.FirstName,
              LastName = user.LastName,
              Email = user.Email,
              PhoneNumber = user.PhoneNumber,
              Role = user.Role,
              IsActive = user.IsActive,
              CompanyId = user.CompanyId
            }
          };
          return response;
        }
      }
    }

    public async Task<ServiceResponse<GetUserDTO>> RegisterUser(RegisterUserDTO newUser, Guid registrationToken)
    {
      ServiceResponse<GetUserDTO> response = new ServiceResponse<GetUserDTO>();

      var databaseRegistrationToken = await _context.Tokens.Where(t => t.TokenValue == registrationToken && t.TokenType == TokenType.REGISTER).FirstOrDefaultAsync();

      if (databaseRegistrationToken == null)
      {
        response.Success = false;
        response.Message = "Registration token does not exist.";
        return response;
      }

      if (databaseRegistrationToken.ExpirationDate < DateTime.Now)
      {
        response.Success = false;
        response.Message = "Registration token has expired.";
        return response;
      }

      var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == databaseRegistrationToken.UserId);

      if (user == null)
      {
        response.Success = false;
        response.Message = "User not found.";
        return response;
      }

      if (user.PasswordHash != null && user.PasswordSalt != null)
      {
        response.Success = false;
        response.Message = "User has already registered.";
        return response;
      }

      CreatePasswordHash(newUser.Password, out byte[] passwordHash, out byte[] passwordSalt);
      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;
      user.PhoneNumber = newUser.PhoneNumber;

      try
      {
        _context.Users.Update(user);
        _context.Tokens.Remove(databaseRegistrationToken);
        await _context.SaveChangesAsync();
        response.Data = _mapper.Map<GetUserDTO>(user);
      }
      catch
      {
        response.Success = false;
        response.Message = "User could not be registered";
        return response;
      }

      return response;
    }

    public string CreateToken(User user)
    {
      List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

      var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
          _configuration.GetSection("AppSettings:Token").Value));

      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      var token = new JwtSecurityToken(
          claims: claims,
          expires: DateTime.Now.AddDays(1),
          signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }

    public bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
      using (var hmac = new HMACSHA512(storedSalt))
      {
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(storedHash);
      }
    }
  }
}
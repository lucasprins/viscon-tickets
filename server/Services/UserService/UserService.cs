using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.Services.AuthService;

namespace server.Services.UserService
{
  public class UserService : IUserService
  {
    private readonly DataContext _context;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;
    public UserService(DataContext context, IAuthService authService, IMapper mapper)
    {
      _mapper = mapper;
      _authService = authService;
      _context = context;
    }

    public async Task<ServiceResponse<AddUserDTO>> AddUser(AddUserDTO newUser)
    {
      ServiceResponse<AddUserDTO> response = new ServiceResponse<AddUserDTO>();

      if (await _context.Users.AnyAsync(u => u.Email.ToLower() == newUser.Email.ToLower()))
      {
        response.Success = false;
        response.Message = "A user with this email already exists.";
        return response;
      }

      User addingUser = new User();
      addingUser.Id = Guid.NewGuid();
      addingUser.FirstName = newUser.FirstName;
      addingUser.LastName = newUser.LastName;
      addingUser.Email = newUser.Email;
      addingUser.Role = newUser.Role;
      addingUser.CompanyId = newUser.CompanyId;

      Token registrationToken = new Token();
      registrationToken.UserId = addingUser.Id;
      registrationToken.TokenType = TokenType.REGISTER;
      registrationToken.TokenValue = Guid.NewGuid();
      registrationToken.ExpirationDate = DateTime.UtcNow.AddDays(3);

      try
      {
        await _context.Users.AddAsync(addingUser);
        await _context.Tokens.AddAsync(registrationToken);
        await _context.SaveChangesAsync();
      }
      catch
      {
        response.Success = false;
        response.Message = "Something went wrong while adding the user.";
        return response;
      }

      return response;
    }

    public async Task<ServiceResponse<bool>> EmailExists(string email)
    {
      ServiceResponse<bool> response = new ServiceResponse<bool>();
      try
      {
        response.Data = await _context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
        response.Message = "Email exists.";
      }
      catch
      {
        response.Success = false;
        response.Message = "Something went wrong while checking if the email exists.";
      }

      return response;
    }
  }
}
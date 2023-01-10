using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.Services.AuthService;
using server.Services.EmailService;

namespace server.Services.UserService
{
  public class UserService : IUserService
  {
    private readonly DataContext _context;
    private readonly IAuthService _authService;
    private readonly IEmailService _emailService;
    private readonly IMapper _mapper;
    public UserService(DataContext context, IAuthService authService, IEmailService emailService, IMapper mapper)
    {
      _mapper = mapper;
      _emailService = emailService;
      _authService = authService;
      _context = context;
    }

    public async Task<ServiceResponse<List<GetUserDTO>>> AddUser(AddUserDTO newUser)
    {
      ServiceResponse<List<GetUserDTO>> response = new ServiceResponse<List<GetUserDTO>>();

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
        await _emailService.SendRegisterEmail(addingUser.Email, registrationToken.TokenValue.ToString());
        response.Data = _context.Users.Where(u => u.CompanyId == addingUser.CompanyId).OrderByDescending(u => u.IsActive).ThenByDescending(u => u.Role).ThenBy(u => u.FirstName).Select(u => _mapper.Map<GetUserDTO>(u)).ToList();
      }
      catch
      {
        response.Success = false;
        response.Message = "Something went wrong while adding the user.";
        return response;
      }

      return response;
    }

    public async Task<ServiceResponse<GetUserDTO>> ChangeEmail(Guid id, string email)
    {
      ServiceResponse<GetUserDTO> response = new ServiceResponse<GetUserDTO>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found.";
        return response;
      }

      if (requestUser.Id != id)
      {
        response.Success = false;
        response.Message = "You are not allowed to change the phone number of another user.";
        return response;
      }

      try
      {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
          response.Success = false;
          response.Message = "User not found.";
          return response;
        }

        user.Email = email;

        _context.Update(user);
        await _context.SaveChangesAsync();
        response.Data = _mapper.Map<GetUserDTO>(user);
      }

      catch
      {
        response.Success = false;
        response.Message = "Something went wrong while changing the users email.";
      }

      return response;
    }

    public async Task<ServiceResponse<GetUserDTO>> ChangePhoneNumber(Guid id, string phoneNumber)
    {
      ServiceResponse<GetUserDTO> response = new ServiceResponse<GetUserDTO>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found.";
        return response;
      }

      if (requestUser.Id != id)
      {
        response.Success = false;
        response.Message = "You are not allowed to change the phone number of another user.";
        return response;
      }

      try
      {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
          response.Success = false;
          response.Message = "User not found.";
          return response;
        }

        user.PhoneNumber = phoneNumber;

        _context.Update(user);
        await _context.SaveChangesAsync();
        response.Data = _mapper.Map<GetUserDTO>(user);
      }

      catch
      {
        response.Success = false;
        response.Message = "Something went wrong while changing the users phone number.";
      }

      return response;
    }

    public async Task<ServiceResponse<List<GetUserDTO>>> ChangeUserRole(Guid id)
    {
      ServiceResponse<List<GetUserDTO>> response = new ServiceResponse<List<GetUserDTO>>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found.";
        return response;
      }

      try
      {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
          response.Success = false;
          response.Message = "User not found.";
          return response;
        }

        if (user.Role == Role.VisconAdmin)
        {
          user.Role = Role.VisconEmployee;
        }
        else if (user.Role == Role.VisconEmployee)
        {
          user.Role = Role.VisconAdmin;
        }
        else if (user.Role == Role.CustomerAdmin)
        {
          user.Role = Role.CustomerEmployee;
        }
        else if (user.Role == Role.CustomerEmployee)
        {
          user.Role = Role.CustomerAdmin;
        }

        _context.Update(user);
        await _context.SaveChangesAsync();
        response.Data = _context.Users.Where(u => u.CompanyId == requestUser.CompanyId).OrderByDescending(u => u.IsActive).ThenByDescending(u => u.Role).ThenBy(u => u.FirstName).Select(u => _mapper.Map<GetUserDTO>(u)).ToList();
      }

      catch
      {
        response.Success = false;
        response.Message = "Something went wrong while changing the user role.";
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

    public async Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers()
    {
      ServiceResponse<List<GetUserDTO>> response = new ServiceResponse<List<GetUserDTO>>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestUser == null)
      {
        response.Success = false;
        response.Message = "User not found.";
        return response;
      }

      try
      {
        var users = await _context.Users.Where(u => u.CompanyId == requestUser.CompanyId).OrderByDescending(u => u.IsActive).ThenByDescending(u => u.Role).ThenBy(u => u.FirstName).ToListAsync();
        response.Data = users.Select(u => _mapper.Map<GetUserDTO>(u)).ToList();
      }
      catch
      {
        response.Success = false;
        response.Message = "Something went wrong while getting the users.";
      }

      return response;
    }

    public async Task<ServiceResponse<List<GetUserDTO>>> ToggleUserStatus(Guid id)
    {
      ServiceResponse<List<GetUserDTO>> response = new ServiceResponse<List<GetUserDTO>>();
      var requestUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == _authService.GetUserEmail());

      if (requestUser == null)
      {
        response.Success = false;
        response.Message = "Requesting user not found.";
        return response;
      }

      try
      {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
          response.Success = false;
          response.Message = "User not found.";
          return response;
        }

        user.IsActive = !user.IsActive;
        await _context.SaveChangesAsync();
        response.Data = _context.Users.Where(u => u.CompanyId == requestUser.CompanyId).OrderByDescending(u => u.IsActive).ThenByDescending(u => u.Role).ThenBy(u => u.FirstName).Select(u => _mapper.Map<GetUserDTO>(u)).ToList();
      }
      catch
      {
        response.Success = false;
        response.Message = "Something went wrong while toggling the user status.";
      }

      return response;
    }
  }
}
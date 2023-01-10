using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Services.UserService;

namespace server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : ControllerBase
  {
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
      _userService = userService;
    }

    [HttpPost("AddUser"), Authorize(Roles = "VisconAdmin, CustomerAdmin")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> AddUser(AddUserDTO newUser)
    {
      return Ok(await _userService.AddUser(newUser));
    }

    [HttpGet("EmailExists/{email}")]
    public async Task<ActionResult<ServiceResponse<bool>>> EmailExists(string email)
    {
      return Ok(await _userService.EmailExists(email));
    }

    [HttpGet("GetUsers"), Authorize(Roles = "VisconAdmin, CustomerAdmin")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetUsers()
    {
      return Ok(await _userService.GetAllUsers());
    }

    [HttpPut("ToggleUserStatus/{id}"), Authorize(Roles = "VisconAdmin, CustomerAdmin")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> ToggleUserStatus(Guid id)
    {
      return Ok(await _userService.ToggleUserStatus(id));
    }

    [HttpPut("ChangeUserRole/{id}"), Authorize(Roles = "VisconAdmin, CustomerAdmin")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> ChangeUserRole(Guid id)
    {
      return Ok(await _userService.ChangeUserRole(id));
    }

    [HttpPut("ChangeEmail/{id}/{email}")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> ChangeEmail(Guid id, string email)
    {
      return Ok(await _userService.ChangeEmail(id, email));
    }
  }
}
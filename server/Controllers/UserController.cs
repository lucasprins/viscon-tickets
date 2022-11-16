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
        public async Task<IActionResult> AddUser(AddUserDTO newUser)
        {
            return Ok(await _userService.AddUser(newUser));
        }

        [HttpGet("EmailExists/{email}")]
        public async Task<IActionResult> EmailExists(string email)
        {
            return Ok(await _userService.EmailExists(email));
        }
    }
}
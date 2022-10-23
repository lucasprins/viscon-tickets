using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOS.User;
using server.Services.AuthService;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<ServiceResponse<GetAuthenticatedUserDTO>>> Login(LoginUserDTO user)
        {
            // Task.Delay(5000).Wait();
            return Ok(await _authService.Login(user));
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> Register(RegisterUserDTO newUser)
        {
            return Ok(await _authService.Register(newUser));
        }
        
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Services.TokenService;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        public TokenController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpGet("verify")]
        public async Task<ActionResult<ServiceResponse<bool>>> VerifyToken([FromQuery] Guid token, [FromQuery] TokenType tokenType)
        {
            return Ok(await _tokenService.VerifyToken(token, tokenType));
        }
    }
}
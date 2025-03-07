using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;

namespace nexus_api.Controllers;

[ApiController]
[Route("api/auth")]
[AllowAnonymous]
public class AuthController : ControllerBase
{
    private readonly IAuthService AuthService;

    public AuthController(IAuthService authService)
    {
        this.AuthService = authService;
    }

    [HttpPost("login")]
    public string Login(LoginDTO loginDTO)
    {
        return this.AuthService.Login(loginDTO);
    }

    [HttpPost("register")]
    public string Register(RegisterDTO registerDTO)
    {
        return this.AuthService.Register(registerDTO);
    }
}

using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;

namespace Nexus.Application.Services;
public class AuthService : IAuthService
{
    public AuthService() { }

    public string Login(LoginDTO login)
    {
        throw new NotImplementedException();
    }

    public string Register(RegisterDTO register)
    {
        throw new NotImplementedException();
    }

    private string GenerateJWTToken(string token)
    {
        throw new NotImplementedException();
    }
}

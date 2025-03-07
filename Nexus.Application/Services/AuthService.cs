using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services;
public class AuthService : IAuthService
{
    public IRequestContext RequestContext { get; set; }

    public IUserRepository UserRepository { get; set; }

    public AuthService(IRequestContext context, IUserRepository userRepository)
    {
        this.UserRepository = userRepository;
    }

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

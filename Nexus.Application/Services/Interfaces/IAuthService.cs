using Nexus.Application.DTO;

namespace Nexus.Application.Services.Interfaces;
public interface IAuthService
{
    string Login(LoginDTO login);

    string Register(RegisterDTO register);

}

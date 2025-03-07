using Nexus.Application.DTO;
using Nexus.Core.Models;

namespace Nexus.Application.Services.Interfaces;
public interface IAuthService
{
    AuthResponse Login(LoginDTO login);

    AuthResponse Register(RegisterDTO register);

}

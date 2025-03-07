using AutoMapper;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services;
public class AuthService : IAuthService
{
    public IMapper Mapper { get; set; }

    public IUserRepository UserRepository { get; set; }

    public AuthService(IMapper mapper, IUserRepository userRepository)
    {
        this.Mapper = mapper;
        this.UserRepository = userRepository;
    }

    public string Login(LoginDTO login)
    {
        throw new NotImplementedException();
    }

    public string Register(RegisterDTO register)
    {
        var user = this.Mapper.Map<User>(register);
        this.UserRepository.AddUser(user);
        throw new NotImplementedException();
    }

    private string GenerateJWTToken(string token)
    {
        throw new NotImplementedException();
    }
}

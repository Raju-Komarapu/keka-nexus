using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Nexus.Application.Services;
public class AuthService : IAuthService
{
    public IMapper Mapper { get; set; }

    public IUserRepository UserRepository { get; set; }

    public ICandidateProfileRepository CandidateProfileRepository { get; set; }

    public IConfiguration Configuration { get; set; }

    public AuthService(
        IMapper mapper,
        IUserRepository userRepository,
        ICandidateProfileRepository candidateProfileRepository,
        IConfiguration configuration)
    {
        this.Mapper = mapper;
        this.UserRepository = userRepository;
        this.CandidateProfileRepository = candidateProfileRepository;
        this.Configuration = configuration;
    }

    public string Login(LoginDTO login)
    {
        throw new NotImplementedException();
    }

    public string Register(RegisterDTO register)
    {
        try
        {
            var candidateProfile = this.Mapper.Map<CandidateProfile>(register);
            var profileId = this.CandidateProfileRepository.AddCandidateProfile(candidateProfile);

            if (profileId == 0)
            {
                throw new Exception("Error in adding candidate profile.");
            }

            var user = this.Mapper.Map<User>(register);
            user.ProfileId = profileId;

            var userId = this.UserRepository.AddUser(user);

            if (userId == 0)
            {
                throw new Exception("Eroor in adding user.");
            }

            return this.GenerateJWTToken(userId);
        }
        catch (Exception)
        {
            throw new Exception("Error in Registering user.");
        }
    }

    private string GenerateJWTToken(int userId)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.Configuration.GetSection("JWT:SecretCode").Value));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var user = this.UserRepository.GetUserById(userId);

        var claims = new[]
        {
                new Claim(ClaimTypes.Email, user.Username),
                new Claim("UserIdentifier", user.Identifier)
        };

        var token = new JwtSecurityToken(
                        issuer: string.Empty,
                        audience: string.Empty,
                        notBefore: DateTime.Now,
                        expires: DateTime.Now.AddHours(5),
                        claims: claims,
                        signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

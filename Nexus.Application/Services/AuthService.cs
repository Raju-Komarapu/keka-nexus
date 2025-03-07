using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Models.Authentication;
using Nexus.Core.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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

    public AuthResponse Login(LoginDTO login)
    {
        try
        {
            var user = this.UserRepository.GetUserByEmail(login.Email);
            if (user == null)
            {
                return new AuthResponse()
                {
                    Succeeded = false,
                    Message = "User not found",
                };
            }

            if (!this.VerifyPassword(login.Password, user.Passwordhash))
            {
                return new AuthResponse()
                {
                    Succeeded = false,
                    Message = "Incorrect Password",
                };
            }

            var token = this.GenerateJWTToken(user.Id);

            return new AuthResponse()
            {
                Succeeded = true,
                Token = token,
            };
        }
        catch (Exception)
        {
            throw new Exception("Error in login");
        }
    }

    public AuthResponse Register(RegisterDTO register)
    {
        try
        {
            if (!register.Password.Equals(register.ConfirmPassword))
            {
                return new AuthResponse()
                {
                    Succeeded = false,
                    Message = "Password and confirm password should match",
                };
            }

            var existingUser = this.UserRepository.GetUserByEmail(register.Email);
            if (existingUser is not null)
            {
                return new AuthResponse()
                {
                    Succeeded = false,
                    Message = "User already registered. Please login",
                };
            }

            var candidateProfile = this.Mapper.Map<CandidateProfile>(register);
            var existingProfile = this.CandidateProfileRepository.GetCandidateProfileByEmail(register.Email);

            var profileId = existingProfile?.Id ?? this.CandidateProfileRepository.AddCandidateProfile(candidateProfile);
            
            if (profileId == 0)
            {
                return new AuthResponse()
                {
                    Succeeded = false,
                    Message = "Error in adding candidate profile",
                };
            }

            var user = this.Mapper.Map<User>(register);
            var hashedPassword = this.HashPassword(register.Password);
            user.ProfileId = profileId;
            user.Passwordhash = hashedPassword;

            var userId = this.UserRepository.AddUser(user);

            if (userId == 0)
            {
                return new AuthResponse()
                {
                    Succeeded = false,
                    Message = "Error in adding user",
                };
            }

            var token = this.GenerateJWTToken(userId);

            return new AuthResponse()
            {
                Succeeded = true,
                Token = token
            };
        }
        catch (Exception)
        {
            throw new Exception("Error in registering user.");
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

    public string HashPassword(string password)
    {
        byte[] salt = new byte[16];
        using (var rng = new RNGCryptoServiceProvider())
        {
            rng.GetBytes(salt);
        }

        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000)) // 10000 iterations
        {
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }
    }

    public bool VerifyPassword(string password, string storedHash)
    {
        byte[] hashBytes = Convert.FromBase64String(storedHash);

        byte[] salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);

        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000))
        {
            byte[] hash = pbkdf2.GetBytes(20);

            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                    return false;
            }
        }

        return true;
    }
}

namespace Nexus.Core.Models.Authentication;
public class AuthResponse
{
    public AuthResponse()
    {
        Token = string.Empty;
    }

    public bool Succeeded { get; set; }

    public string Message { get; set; }

    public string Token { get; set; }
}

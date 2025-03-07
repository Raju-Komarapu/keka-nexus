namespace Nexus.Core.Models;
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

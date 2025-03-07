namespace Nexus.Core.Models;

public interface IRequestContext
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Token { get; set; }
}

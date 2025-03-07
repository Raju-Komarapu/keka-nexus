namespace Nexus.Core.Models;
public class User
{
    public User()
    {
        Identifier = Guid.NewGuid().ToString();
    }

    public int Id { get; set; }

    public string Identifier { get; set; }

    public string Username { get; set; }

    public string Passwordhash { get; set; }

    public int ProfileId { get; set; }
}

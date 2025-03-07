using Nexus.Core.Models;

namespace Nexus.Core.Repositories;
public interface IUserRepository
{
    int AddUser(User user);

    User GetUserById(int id);

    User GetUserByIdentifier(string identifier);

    User GetUserByEmail(string email);
}

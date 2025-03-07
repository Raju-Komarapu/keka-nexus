using Nexus.Core.Models;

namespace Nexus.Core.Repositories;
public interface IUserRepository
{
    bool AddUser(User user);
}

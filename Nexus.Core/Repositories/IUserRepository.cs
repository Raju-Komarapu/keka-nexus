using Nexus.Core.Models;

namespace Nexus.Core.Repositories;
public interface IUserRepository
{
    long AddUser(User user);
}

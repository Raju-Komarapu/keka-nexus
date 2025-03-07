using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services;
public class ContextService
{
    private readonly IUserRepository UserRepository;
    public ContextService(IUserRepository userRepository)
    {
        this.UserRepository = userRepository;
    }

    public User GetUserByIdentifier(string userIdentifier)
    {
        return this.UserRepository.GetUserByIdentifier(userIdentifier);
    }

}

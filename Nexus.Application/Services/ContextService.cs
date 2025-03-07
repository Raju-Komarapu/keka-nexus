using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services;
public class ContextService(IUserRepository userRepository, ICandidateProfileRepository candidateProfileRepository)
{
    public User GetUserByIdentifier(string userIdentifier)
    {
        return userRepository.GetUserByIdentifier(userIdentifier);
    }

    public string GetDisplayName(int profileId)
    {
        return candidateProfileRepository.GetCandidateProfile(profileId).DisplayName;
    }
}

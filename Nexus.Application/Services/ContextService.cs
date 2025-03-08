using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services;
public class ContextService(IUserRepository userRepository, ICandidateProfileRepository candidateProfileRepository)
{
    public User GetUserByIdentifier(string userIdentifier)
    {
        return userRepository.GetUserByIdentifier(userIdentifier);
    }

    public (string, bool) GetDisplayName(int profileId)
    {
        var candidateProfile = candidateProfileRepository.GetCandidateProfile(profileId);
        return (candidateProfile.DisplayName, candidateProfile.IsProfileUpdated);
    }
}

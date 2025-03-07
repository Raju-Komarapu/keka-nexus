using Nexus.Core.Models;

namespace Nexus.Core.Repositories;
public interface ICandidateProfileRepository
{
    int AddCandidateProfile(CandidateProfile candidateProfile);

    CandidateProfile? GetCandidateProfileByEmail(string email);
}

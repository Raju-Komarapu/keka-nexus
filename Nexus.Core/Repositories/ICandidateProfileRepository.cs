using Nexus.Core.Models;

namespace Nexus.Core.Repositories;
public interface ICandidateProfileRepository
{
    int AddCandidateProfile(CandidateProfile candidateProfile);

    CandidateProfile GetCandidateProfile(int id);

    bool UpdateCandidateProfile(CandidateProfile candidateProfile);

    bool DoesCandidateExist(int  candidateProfileId);

    CandidateProfile? GetCandidateProfileByEmail(string email);
}

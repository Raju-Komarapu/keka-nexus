using Nexus.Application.DTO;

namespace Nexus.Application.Services.Interfaces;

public interface ICandidateProfileService
{
    bool UpdateCandidateProfile(int id, CandidateProfileDto candidateProfileDto);

    CandidateProfileDto GetCandidateProfile();
}

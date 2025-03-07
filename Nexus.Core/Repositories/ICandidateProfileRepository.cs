using Nexus.Core.Models;

namespace Nexus.Core.Repositories;
public interface ICandidateProfileRepository
{
    long AddCandidateProfile(CandidateProfile candidateProfile);
}

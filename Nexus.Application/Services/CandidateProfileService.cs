using AutoMapper;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services;

public class CandidateProfileService(IRequestContext requestContext, IMapper mapper, ICandidateProfileRepository candidateProfileRepository)
    : ServiceBase(requestContext), ICandidateProfileService
{
    public CandidateProfileDto GetCandidateProfile()
    {
        var candidateProfile = candidateProfileRepository.GetCandidateProfile(requestContext.ProfileId);
        return mapper.Map<CandidateProfileDto>(candidateProfile);
    }

    public bool UpdateCandidateProfile(int id, CandidateProfileDto candidateProfileDto)
    {
        if (id != requestContext.ProfileId)
        {
            throw new Exception("Invalid candidate profile");
        }

        if (!candidateProfileRepository.DoesCandidateExist(id))
        {
            throw new Exception("Candidate profile doesn't exist");
        }

        candidateProfileDto.Id = id;
        var candidateProfile = mapper.Map<CandidateProfile>(candidateProfileDto);
        return candidateProfileRepository.UpdateCandidateProfile(candidateProfile);
    }
}

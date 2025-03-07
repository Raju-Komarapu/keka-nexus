using AutoMapper;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services;

public class CandidateProfileService(IRequestContext requestContext, IMapper mapper, ICandidateProfileRepository candidateProfileRepository)
    : ServiceBase(requestContext), ICandidateProfileService
{
    public bool UpdateCandidateProfile(CandidateProfileDto candidateProfileDto)
    {
        if(!candidateProfileRepository.DoesCandidateExist(candidateProfileDto.Id))
        {
            throw new Exception("Candidate profile doesn't exist");
        }

        var candidateProfile = mapper.Map<CandidateProfile>(candidateProfileDto);
        return candidateProfileRepository.UpdateCandidateProfile(candidateProfile);
    }
}

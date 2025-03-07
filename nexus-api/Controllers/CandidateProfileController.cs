using Microsoft.AspNetCore.Mvc;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;

namespace Nexus.WebAPI.Controllers;

[Route("api/candidateprofile")]
public class CandidateProfileController(
    ICandidateProfileService candidateProfileService)
    : BaseController
{
    [HttpGet("me")]
    public CandidateProfileDto GetCandidate()
    {
        return candidateProfileService.GetCandidateProfile();
    }

    [HttpPut("{id}")]
    public bool UpdateCandidateProfile([FromRoute] int id ,[FromBody] CandidateProfileDto candidateProfile)
    {
        return candidateProfileService.UpdateCandidateProfile(id, candidateProfile);
    }
}
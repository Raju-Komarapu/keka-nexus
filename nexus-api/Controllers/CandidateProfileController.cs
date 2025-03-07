using Microsoft.AspNetCore.Mvc;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;

namespace Nexus.WebAPI.Controllers;

[ApiController]
[Route("api/candidateprofile")]
public class CandidateProfileController(ICandidateProfileService candidateProfileService)
    : BaseController
{
    [HttpPut]
    public bool UpdateCandidateProfile(CandidateProfileDto candidateProfile)
    {
        return candidateProfileService.UpdateCandidateProfile(candidateProfile);
    }
}
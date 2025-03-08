using Microsoft.AspNetCore.Mvc;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;
using Nexus.WebAPI.Controllers;

namespace nexus_api.Controllers
{
    [Route("api/jobapplication")]
    [ApiController]
    public class JobApplicationController(IJobApplicationService jobApplicationService) : BaseController
    {
        [HttpGet]
        public List<JobApplicationDto> GetCandidate()
        {
            return jobApplicationService.GetJobApplications();
        }

        [HttpPut]
        public bool UpdateJobApplicationStatus([FromBody] JobApplicationDto jobApplication)
        {
            return jobApplicationService.UpdateJobApplicationStatus(jobApplication);
        }

        [HttpPost]
        public bool AddJobApplication([FromBody] JobApplicationDto jobApplication)
        {
            return jobApplicationService.AddJobApplication(jobApplication);
        }
    }
}

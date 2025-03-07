using Nexus.Application.DTO;

namespace Nexus.Application.Services.Interfaces;

public interface IJobApplicationService
{
    bool AddJobApplication(JobApplicationDto jobApplication);

    bool UpdateJobApplicationStatus(JobApplicationDto jobApplication);

    List<JobApplicationDto> GetJobApplications();
}

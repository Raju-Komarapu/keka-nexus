using AutoMapper;
using Nexus.Application.DTO;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Models.Enums;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services;

public class JobApplicationService(IRequestContext requestContext, IMapper mapper, IJobApplicationRepository jobApplicationRepository)
    : ServiceBase(requestContext), IJobApplicationService
{
    public bool AddJobApplication(JobApplicationDto jobApplicationDto)
    {
        if (jobApplicationRepository.DoesJobApplicationExist(this.RequestContext.ProfileId, jobApplicationDto.JobId))
        {
            throw new Exception("Job Application already exists");
        }

        var jobApplication = mapper.Map<JobApplication>(jobApplicationDto);
        jobApplication.ApplicationStatusLog = new List<ApplicationStatusLog> { 
                                                    new ApplicationStatusLog() { Status = ApplicationStatus.New, IsCompleted = true, CompletedOn = DateTime.UtcNow},
                                                    new ApplicationStatusLog() { Status = ApplicationStatus.Screening, IsCompleted = true, CompletedOn = DateTime.UtcNow}
                                                };
        jobApplication.ProfileId = this.RequestContext.ProfileId;
        jobApplication.ApplicationStatus = ApplicationStatus.New;
        return jobApplicationRepository.AddJobApplication(jobApplication) != 0;
    }

    public List<JobApplicationDto> GetJobApplications()
    {
        var jobApplications = jobApplicationRepository.GetJobApplications(this.RequestContext.ProfileId);
        return mapper.Map<List<JobApplicationDto>>(jobApplications);
    }

    public bool UpdateJobApplicationStatus(JobApplicationDto jobApplicationDto)
    {
        var jobApplication = mapper.Map<JobApplication>(jobApplicationDto);
        if (jobApplication != null)
        {
            jobApplication.ApplicationStatusLog.Add(new ApplicationStatusLog() { Status = jobApplicationDto.ApplicationStatus, IsCompleted = true, CompletedOn = DateTime.UtcNow });
        }
        jobApplication.ProfileId = this.RequestContext.ProfileId;
        return jobApplicationRepository.UpdateJobApplicationStatus(jobApplication);
    }
}

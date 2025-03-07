using Nexus.Core.Models;

namespace Nexus.Core.Repositories;

public interface IJobApplicationRepository
{
    int AddJobApplication(JobApplication jobApplication);

    bool UpdateJobApplicationStatus(JobApplication candidateProfile);

    List<JobApplication> GetJobApplications(int candidateProfileId);

    bool DoesJobApplicationExist(int profileId, int jobId);
}

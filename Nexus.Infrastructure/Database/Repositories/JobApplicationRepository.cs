using AutoMapper;
using Dapper;
using Nexus.Core.Models;
using Nexus.Core.Repositories;
using Nexus.Infrastructure.Database.DbModels;
using Nexus.Infrastructure.Database.SQLQueries;
using Nexus.Infrastructure.Database.Extensions;

namespace Nexus.Infrastructure.Database.Repositories;

public class JobApplicationRepository(DatabaseContext Db, IMapper mapper)
: BaseRepository(Db, mapper), IJobApplicationRepository
{
    public int AddJobApplication(JobApplication jobApplication)
    {
        var dbJobApplication = this.Mapper.Map<DbJobApplication>(jobApplication);
        return this.Db.Connection.ExecuteScalar<int>(JobApplicationQueries.InsertJobApplication, dbJobApplication);
    }

    public List<JobApplication> GetJobApplications(int candidateProfileId)
    {
        var dbJobApplications = this.Db.Connection.Query<DbJobApplication>(JobApplicationQueries.GetJobApplicationByProfielId, new { ProfileId = candidateProfileId });
        return this.Mapper.Map<List<JobApplication>>(dbJobApplications);
    }

    public bool UpdateJobApplicationStatus(JobApplication jobApplication)
    {
        var dbJobApplication = this.Mapper.Map<DbJobApplication>(jobApplication);
        dbJobApplication.SetFieldsOnUpdate();
        return this.Db.Connection.Execute(JobApplicationQueries.UpdateJobApplicationStatus, dbJobApplication) == 1;
    }

    public bool DoesJobApplicationExist(int profileId, int jobId)
    {
        return this.Db.Connection.ExecuteScalar<bool>(JobApplicationQueries.DoesJobApplicationExist, new { JobId = jobId, ProfileId = profileId });
    }
}

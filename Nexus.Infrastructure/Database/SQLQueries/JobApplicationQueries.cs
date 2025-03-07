namespace Nexus.Infrastructure.Database.SQLQueries;

internal static class JobApplicationQueries
{
    public const string InsertJobApplication = @"
        INSERT INTO [JobApplication]
            (Identifier, JobId, TenantId, ProfileId, ApplicationStatus) OUTPUT INSERTED.Id
        VALUES (@Identifier, @JobId, @TenantId, @ProfileId, @ApplicationStatus)
    ";

    public const string GetJobApplicationByProfielId = @"
        SELECT * 
        FROM [JobApplication]
        WHERE ProfileId = @ProfileId
    ";

    public const string UpdateJobApplicationStatus = @"
        UPDATE [JobApplication]
            SET ApplicationStatus = @ApplicationStatus,
                ModifiedOn = @ModifiedOn
        WHERE Id = @Id And ProfileId = @ProfileId
    ";

    public const string DoesJobApplicationExist = @"
        SELECT 
	        CASE 
		        WHEN EXISTS (
			        SELECT 1
			        FROM JobApplication
			        WHERE JobId = @JobId AND ProfileId = @ProfileId
		        )
		        THEN 1 
		        ELSE 0 
        END
    ";
}

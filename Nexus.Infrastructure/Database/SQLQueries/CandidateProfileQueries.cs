namespace Nexus.Infrastructure.Database.SQLQueries;

internal static class CandidateProfileQueries
{
    public const string InsertCandidateProfile = @"
        INSERT INTO [CandidateProfile]
            (Identifier, FirstName, LastName, Email, Phone) OUTPUT INSERTED.Id
        VALUES (@Identifier, @FirstName, @LastName, @Email, @Phone)
    ";

    public const string GetCandidateById = @"
        SELECT * 
        FROM [CandidateProfile]
        WHERE Id = @Id
    ";

    public const string UpdateCandidateProfile = @"
        UPDATE [CandidateProfile]
            SET FirstName = @FirstName,
                MiddleName = @MiddleName,
                LastName = @LastName,
                Phone = @Phone,
                DateOfBirth = @DateOfBirth,
                ExpectedSalary = @ExpectedSalary,
                CurrentSalary = @CurrentSalary,
                Address = @Address,
                CurrentLocation = @CurrentLocation,
                PreferredLocation = @PreferredLocation,
                Experience = @Experience,
                Education = @Education,
                ResumeLocation = @ResumeLocation,
                ModifiedOn = @ModifiedOn
        WHERE Id = @Id
    ";

    public const string DoesCandidateExist = @"
        SELECT 
	        CASE 
		        WHEN EXISTS (
			        SELECT 1
			        FROM Users
			        WHERE Id = @Id
		        )
		        THEN 1 
		        ELSE 0 
        END
    ";

    public const string GetProfilebyEmail = @"
        SELECT * FROM [CandidateProfile]
        WHERE Email  = @Email
    ";
}

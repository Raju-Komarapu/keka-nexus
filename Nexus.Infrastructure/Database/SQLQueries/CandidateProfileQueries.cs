namespace Nexus.Infrastructure.Database.SQLQueries;

internal static class CandidateProfileQueries
{
    public const string InsertCandidateProfile = @"
        INSERT INTO [CandidateProfile]
            (Identifier, FirstName, LastName, Email, Phone) OUTPUT INSERTED.Id
        VALUES (@Identifier, @FirstName, @LastName, @Email, @Phone)
    ";

    public const string GetProfilebyEmail = @"
        SELECT * FROM [CandidateProfile]
        WHERE Email  = @Email
    ";
}

namespace Nexus.Infrastructure.Database.SQLQueries;
internal static class UserQueries
{
    public const string GetById = @"
    SELECT * FROM User
    WHERE Id = @UserId";

    public const string GetByEmail = @"
    SELECT * FROM User
    WHERE Username = @Email";
}

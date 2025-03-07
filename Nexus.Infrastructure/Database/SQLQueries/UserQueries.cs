namespace Nexus.Infrastructure.Database.SQLQueries;
internal static class UserQueries
{
    public const string GetById = @"
    SELECT * FROM Users
    WHERE Id = @UserId";

    public const string GetByEmail = @"
    SELECT * FROM Users
    WHERE Username = @Email";

    public const string InsertUser = @"
    INSERT INTO [Users]
            (Identifier, Username, PasswordHash, ProfileId, CreatedOn, ModifiedOn) OUTPUT INSERTED.Id
        VALUES (@Identifier, @Username, @PasswordHash, @ProfileId, @CreatedOn, @ModifiedOn)
    ";
}

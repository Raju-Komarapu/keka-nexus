using AutoMapper;
using Dapper;
using Nexus.Core.Models;
using Nexus.Core.Repositories;
using Nexus.Infrastructure.Database.DbModels;
using Nexus.Infrastructure.Database.SQLQueries;

namespace Nexus.Infrastructure.Database.Repositories;
public class UserRepository(DatabaseContext db, IMapper mapper) : BaseRepository(db, mapper), IUserRepository
{
    public int AddUser(User user)
    {
        var userDataModel = this.Mapper.Map<DbUser>(user);
        userDataModel.CreatedOn = DateTime.UtcNow;
        userDataModel.ModifiedOn = DateTime.UtcNow;
        return this.Db.Connection.ExecuteScalar<int>(UserQueries.InsertUser, userDataModel);
    }

    public User GetUserById(int id)
    {
        var user = this.Db.Connection.QuerySingleOrDefault<DbUser>(UserQueries.GetById, new { UserId = id });
        return user is not null ? this.Mapper.Map<User>(user) : null;
    }

    public User GetUserByEmail(string email)
    {
        var user = this.Db.Connection.QuerySingleOrDefault<DbUser>(UserQueries.GetByEmail, new { Email = email });
        return user is not null ? this.Mapper.Map<User>(user) : null;
    }
}

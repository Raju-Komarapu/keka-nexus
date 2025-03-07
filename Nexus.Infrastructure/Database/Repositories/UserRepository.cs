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
        throw new NotImplementedException();
    }

    public User GetUserById(int id)
    {
        var user = this.Db.Connection.Query<DbUser>(UserQueries.GetById, new { UserId = id });
        return this.Mapper.Map<User>(user);
    }

    public User GetUserByEmail(string email)
    {
        var user = this.Db.Connection.Query<DbUser>(UserQueries.GetByEmail, new { Email = email });
        return this.Mapper.Map<User>(user);
    }
}

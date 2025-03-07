using AutoMapper;
using Dapper.Contrib.Extensions;
using Nexus.Core.Models;
using Nexus.Core.Repositories;
using Nexus.Infrastructure.Database.DbModels;

namespace Nexus.Infrastructure.Database.Repositories;
public class UserRepository(DatabaseContext db, IMapper mapper) : BaseRepository(db, mapper), IUserRepository
{
    public long AddUser(User user)
    {
        var userDataModel = this.Mapper.Map<DbUser>(user);
        return this.Db.Connection.Insert(userDataModel);
    }
}

using AutoMapper;
using Dapper;
using Nexus.Core.Repositories;
using Nexus.Infrastructure.Database.DbModels;
using Nexus.Infrastructure.Database.SQLQueries;

namespace Nexus.Infrastructure.Database.Repositories
{
    public class DummyRepository(DatabaseContext db, IMapper mapper)
        : BaseRepository(db, mapper), IDummyRepository
    {
        public async Task<dynamic> GetAllData()
        {
            try
            {
                var all = this.Db.Connection.Query<DbUser>(DummyQueries.SelectAll);
                return all;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}

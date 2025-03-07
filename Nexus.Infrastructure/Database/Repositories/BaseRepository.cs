using AutoMapper;

namespace Nexus.Infrastructure.Database.Repositories
{
    public abstract class BaseRepository(DatabaseContext db, IMapper mapper)
    {
        /// <summary>
        /// Provides functionalities to establish and configure database connections using Dapper.
        /// </summary>
        protected readonly DatabaseContext Db = db;

        /// <summary>
        /// Provides mapping between domain models and data entities.
        /// </summary>
        protected readonly IMapper Mapper = mapper;
    }
}

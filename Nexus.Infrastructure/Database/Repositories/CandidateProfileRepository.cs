using AutoMapper;
using Dapper;
using Nexus.Core.Models;
using Nexus.Core.Repositories;
using Nexus.Infrastructure.Database.DbModels;
using Nexus.Infrastructure.Database.SQLQueries;

namespace Nexus.Infrastructure.Database.Repositories;
public class CandidateProfileRepository(DatabaseContext Db, IMapper mapper) : BaseRepository(Db, mapper), ICandidateProfileRepository
{
    public int AddCandidateProfile(CandidateProfile candidateProfile)
    {
        var dbCandidateProfile = this.Mapper.Map<DbCandidateProfile>(candidateProfile);
        return this.Db.Connection.ExecuteScalar<int>(CandidateProfileQueries.InsertCandidateProfile, dbCandidateProfile);
    }
}

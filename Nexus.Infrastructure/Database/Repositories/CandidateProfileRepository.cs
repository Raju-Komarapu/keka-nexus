using AutoMapper;
using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Infrastructure.Database.Repositories;
internal class CandidateProfileRepository(DatabaseContext Db, IMapper mapper) : BaseRepository(Db, mapper), ICandidateProfileRepository
{
    public long AddCandidateProfile(CandidateProfile candidateProfile)
    {
        throw new NotImplementedException();
    }
}

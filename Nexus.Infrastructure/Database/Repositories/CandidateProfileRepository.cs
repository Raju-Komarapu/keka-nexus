﻿using AutoMapper;
using Dapper;
using Nexus.Core.Models;
using Nexus.Core.Repositories;
using Nexus.Infrastructure.Database.DbModels;
using Nexus.Infrastructure.Database.SQLQueries;

namespace Nexus.Infrastructure.Database.Repositories;
public class CandidateProfileRepository(DatabaseContext Db, IMapper mapper) 
    : BaseRepository(Db, mapper), ICandidateProfileRepository
{
    public int AddCandidateProfile(CandidateProfile candidateProfile)
    {
        var dbCandidateProfile = this.Mapper.Map<DbCandidateProfile>(candidateProfile);
        return this.Db.Connection.ExecuteScalar<int>(CandidateProfileQueries.InsertCandidateProfile, dbCandidateProfile);
    }

    public CandidateProfile GetCandidateProfile(int id)
    {
        var candidateProfile = this.Db.Connection.QuerySingleOrDefault<DbCandidateProfile>(CandidateProfileQueries.GetCandidateById, new { Id = id });
        return this.Mapper.Map<CandidateProfile>(candidateProfile);
    }

    public CandidateProfile? GetCandidateProfileByEmail(string email)
    {
        var candidateProfile = this.Db.Connection.QuerySingleOrDefault<DbCandidateProfile>(CandidateProfileQueries.GetProfilebyEmail, new { Email = email });
        return candidateProfile is not null ? this.Mapper.Map<CandidateProfile>(candidateProfile) : null;
    }

    public bool UpdateCandidateProfile(CandidateProfile candidateProfile)
    {
        var dbCandidateProfile = this.Mapper.Map<DbCandidateProfile>(candidateProfile);
        dbCandidateProfile.ModifiedOn = DateTime.UtcNow;
        dbCandidateProfile.IsProfileUpdated = true;
        return this.Db.Connection.Execute(CandidateProfileQueries.UpdateCandidateProfile, dbCandidateProfile) == 1;
    }

    public bool DoesCandidateExist(int candidateProfileId)
    {
        return this.Db.Connection.ExecuteScalar<bool>(CandidateProfileQueries.DoesCandidateExist, new { Id = candidateProfileId });
    }
}

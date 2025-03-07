using AutoMapper;
using Nexus.Core.Models;
using Nexus.Infrastructure.Database.DbModels;

namespace Nexus.Infrastructure;
public class DataMapperProfile: Profile
{
    public DataMapperProfile()
    {
        this.CreateMap<User, DbUser>()
            .ReverseMap();

    }
}

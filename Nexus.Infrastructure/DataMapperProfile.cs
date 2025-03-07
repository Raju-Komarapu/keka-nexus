using AutoMapper;
using Nexus.Core.Extensions;
using Nexus.Core.Models;
using Nexus.Infrastructure.Database.DbModels;

namespace Nexus.Infrastructure;
public class DataMapperProfile: Profile
{
    public DataMapperProfile()
    {
        this.CreateMap<User, DbUser>()
            .ReverseMap();

        this.CreateMap<CandidateProfile, DbCandidateProfile>()
            .ForMember(d => d.Address, opt => opt.MapFrom(src => src.Address.ToJson()))
            .ForMember(d => d.PreferredLocation, opt => opt.MapFrom(src => src.PreferredLocation.ToJson()))
            .ForMember(d => d.Experience, opt => opt.MapFrom(src => src.Experience.ToJson()))
            .ForMember(d => d.Education, opt => opt.MapFrom(src => src.Education.ToJson()))
            .ReverseMap()
            .ForMember(d => d.Address, opt => opt.MapFrom(src => src.Address.FromJson<Address>()))
            .ForMember(d => d.PreferredLocation, opt => opt.MapFrom(src => src.PreferredLocation.FromJson<PreferredLocation>()))    
            .ForMember(d => d.Experience, opt => opt.MapFrom(src => src.Experience.FromJson<IEnumerable<ExperienceDetails>>()))
            .ForMember(d => d.Education, opt => opt.MapFrom(src => src.Education.FromJson<IEnumerable<EducationDetails>>()));
    }
}

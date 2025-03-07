using AutoMapper;
using Nexus.Application.DTO;
using Nexus.Core.Models;

namespace Nexus.Application;
public class DtoMapperProfile: Profile
{
    public DtoMapperProfile()
    {
        this.CreateMap<RegisterDTO, User>()
            .ForMember(src => src.Username, opt => opt.MapFrom(dest => dest.Email));


        this.CreateMap<RegisterDTO, CandidateProfile>();

        this.CreateMap<CandidateProfileDto, CandidateProfile>()
            .ReverseMap();
    }
}

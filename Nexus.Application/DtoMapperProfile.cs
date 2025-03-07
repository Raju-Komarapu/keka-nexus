using AutoMapper;
using Nexus.Application.DTO;
using Nexus.Core.Models;

namespace Nexus.Application;
public class DtoMapperProfile : Profile
{
    public DtoMapperProfile()
    {
        this.CreateMap<RegisterDTO, CandidateProfile>();

        this.CreateMap<CandidateProfileDto, CandidateProfile>();
    }
}


using System.ComponentModel;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDTO>()
                .ForMember(desc => desc.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(desc => desc.Age, opt => opt.MapFrom(src => src.DateofBirth.CalculateAge()));
            CreateMap<Photo, PhotoDTO>();
        }
    }
}
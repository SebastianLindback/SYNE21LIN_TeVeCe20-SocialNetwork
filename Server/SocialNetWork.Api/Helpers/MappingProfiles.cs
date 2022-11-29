using AutoMapper;
using SocialNetwork.Api.Dto;
using SocialNetwork.Entity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Post, PostDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();

        }
    }
}

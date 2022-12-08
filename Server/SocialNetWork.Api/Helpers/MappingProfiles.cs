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
            CreateMap<Message, MessageDto>()
            .ForMember(x => x.ReceiverId, o => o.MapFrom(c => c.FK_ReceiverId))
            .ForMember(x => x.SenderId, o => o.MapFrom(c => c.FK_SenderId));
        }
    }
}

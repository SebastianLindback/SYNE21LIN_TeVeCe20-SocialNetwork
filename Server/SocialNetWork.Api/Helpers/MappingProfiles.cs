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
            CreateMap<Subscription, SubscriptionDto>()
            .ForMember(x => x.SubscribedToId, o => o.MapFrom(c => c.SubscribedToId))
            .ForMember(x => x.SubscriberId, o => o.MapFrom(c => c.SubscriberId));

        }
    }
}

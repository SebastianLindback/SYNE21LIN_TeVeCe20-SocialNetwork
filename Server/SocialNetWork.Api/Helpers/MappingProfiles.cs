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

            CreateMap<User, UserName_UserIdDto>()
            .ForMember(x => x.Id, o => o.MapFrom(c => c.Id))
            .ForMember(x => x.Name, o => o.MapFrom(c => c.Name));

            CreateMap<Subscription, SubscriptionDto>()
            .ForMember(x => x.SubscribedToId, o => o.MapFrom(c => c.SubscribedToId))
            .ForMember(x => x.SubscriberId, o => o.MapFrom(c => c.SubscriberId));

            CreateMap<Message, MessageDto>()
            .ForMember(x => x.Receiver, o => o.MapFrom(c => c.Receiver.Name))
            .ForMember(x => x.Sender, o => o.MapFrom(c => c.Sender.Name));
        }
    }
}

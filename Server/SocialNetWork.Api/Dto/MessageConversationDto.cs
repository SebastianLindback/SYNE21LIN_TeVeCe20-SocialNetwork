using SocialNetwork.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Api.Dto
{
    public class MessageConversationDto
    {
        public ICollection<MessageDto>? Messages { get; set; }
        
        public ICollection<UserName_UserIdDto>? UsersInConversation { get; set; }
        
    }
}

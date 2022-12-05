using SocialNetwork.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Api.Dto
{
    public class MessagesDto
    {
        public ICollection<MessageDto> Messages { get; set; }
    }
}

using SocialNetwork.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Api.Dto
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string? Sender { get; set; }
        public int ReceiverId { get; set; }
        public string? Receiver { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}

using SocialNetwork.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Api.Dto
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int From_UserId { get; set; }
        public int To_UserId { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}

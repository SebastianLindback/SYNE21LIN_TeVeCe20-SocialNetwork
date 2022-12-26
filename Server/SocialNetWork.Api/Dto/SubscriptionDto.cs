using SocialNetwork.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Api.Dto
{
    public class SubscriptionDto
    {
    public DateTime CreatedDate { get; set; }

    public int SubscriberId { get; set; }

    public int Id { get; set; }

    public string Name { get; set; }

    public int SubscribedToId { get; set; }

    }
}

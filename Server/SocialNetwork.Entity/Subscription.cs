using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Entity;

public class Subscription : BaseEntity
{
    public DateTime CreatedDate { get; set; }

    [ForeignKey("SubscribedToId")]
    public User SubscribedTo { get; set; }

    [ForeignKey("SubscriberId")]
    public User Subscriber { get; set; }

    public int SubscriberId { get; set; }

    public int SubscribedToId { get; set; }

}
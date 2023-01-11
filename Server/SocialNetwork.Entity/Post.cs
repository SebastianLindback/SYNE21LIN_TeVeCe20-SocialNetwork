
using System.ComponentModel.DataAnnotations.Schema;
namespace SocialNetwork.Entity;

public class Post : BaseEntity
{
    public string? Message { get; set; }
    public DateTime CreatedDate { get; set; }

    public int SenderId { get;set; }
    public User? Sender { get; set; }
    public int ReceiverId { get;set; }
    public User? Receiver { get; set; }


}
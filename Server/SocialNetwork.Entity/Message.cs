using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Entity;

public class Message : BaseEntity
{
    public int FK_SenderId { get;set; }
    public int FK_ReceiverId { get;set; }
    [ForeignKey("FK_SenderId")]
    public User? Sender { get; set; }
    [ForeignKey("FK_ReceiverId")]
    public User? Receiver { get; set; }
    public string? Content { get; set; }
    public DateTime CreatedDate { get; set; }
}
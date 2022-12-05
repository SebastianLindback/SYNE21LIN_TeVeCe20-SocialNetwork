using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Entity;

public class Message : BaseEntity
{
    [ForeignKey("From_UserId")]
    public User? From { get; set; }
    [ForeignKey("To_UserId")]
    public User? To { get; set; }
    public string? Content { get; set; }
    public DateTime CreatedDate { get; set; }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Entity;

public class Post : BaseEntity
{
    public string Message { get; set; }
    public DateTime CreatedDate { get; set; }
    
    [ForeignKey("UserId")]
    public User User { get; set; }

}
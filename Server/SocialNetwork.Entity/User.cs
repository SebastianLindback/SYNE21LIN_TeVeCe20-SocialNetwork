namespace SocialNetwork.Entity;

public class User : BaseEntity
{
    public string Name { get; set; }
    public ICollection<Post> Posts { get; set; }
    
}
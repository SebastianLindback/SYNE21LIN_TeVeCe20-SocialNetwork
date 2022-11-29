using SocialNetwork.Entity;

namespace SocialNetwork.Api.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<PostDto> Posts { get; set; }
    }
}

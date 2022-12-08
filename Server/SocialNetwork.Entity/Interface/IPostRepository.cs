namespace SocialNetwork.Entity.Interface
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        Task<IReadOnlyList<Post>> ListAllAsync();
        Task<IReadOnlyList<Post>> ListAllByUserIdAsync(int userId);
    }
}
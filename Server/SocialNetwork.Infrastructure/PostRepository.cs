using Microsoft.EntityFrameworkCore;
using SocialNetwork.Entity;
using SocialNetwork.Entity.Interface;

namespace SocialNetwork.Infrastructure
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        private readonly SocialNetworkContext _context;
        public PostRepository(SocialNetworkContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Post>> ListAllAsync()
        {
            return await _context.Set<Post>()
                .Include(x => x.User)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<Post>> ListAllByUserIdAsync(int userId)
        {
            return await _context.Set<Post>()
                .Include(x => x.User)
                .Where(x => x.User.Id == userId)
                .ToListAsync();
        }
    }
}
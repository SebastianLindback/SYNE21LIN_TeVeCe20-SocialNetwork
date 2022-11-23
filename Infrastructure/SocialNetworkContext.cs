using Entity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class SocialNetworkContext : DbContext
    {
        public SocialNetworkContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Post> Post {get; set;}
    }

using System.IO.Compression;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Entity;

namespace SocialNetwork.Infrastructure
{
    public class SocialNetworkContext : DbContext
    {
        public SocialNetworkContext(DbContextOptions options) :
            base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Message> Messages { get; set; }

        public DbSet<Subscription> Subscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Post>().HasOne(x => x.Receiver)
            .WithMany(x => x.Posts)
            .HasForeignKey(x => x.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict); 

            builder.Entity<Post>().HasOne(x => x.Receiver)
            .WithMany(x => x.Posts)
            .HasForeignKey(x => x.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict); 
        }
    }
}

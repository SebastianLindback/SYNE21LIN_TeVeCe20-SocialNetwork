using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Infrastructure
{
    public class SocialNetworkContextSeed
    {
        public static async Task SeedAsync(SocialNetworkContext context)
        {
            if (!context.Users.Any())
            {
                var user = new User
                {
                    Id = 1,
                    Name = "Robert Jansz",
                    Posts = new List<Post>
                    {
                        new Post
                        {
                            Id = 1,
                            CreatedDate = DateTime.Now,
                            Message = "Hello World",
                        }
                    }
                };

                await context.Users.AddAsync(user);

                await context.Users.AddAsync(new User
                {
                    Id = 2,
                    Name = "test user",
                    
                });
                
                await context.SaveChangesAsync();
            }
        }
    }
}

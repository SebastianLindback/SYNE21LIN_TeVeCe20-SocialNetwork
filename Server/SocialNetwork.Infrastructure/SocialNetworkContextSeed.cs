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
                    Name = "Robert Jansz",
                    Posts = new List<Post>
                    {
                        new Post
                        {
                            CreatedDate = DateTime.Now,
                            Message = "Hello World",
                        }
                    }
                };
                
                var user2 = new User
                {
                    Name = "Jonny Cage ",
                    Posts = new List<Post>
                    {
                        new()
                        {
                            CreatedDate = DateTime.Now,
                            Message = "Hello Again",
                        }
                    }
                };
                  var user3 = new User
                {
                    Name = "shit Cage ",
                    Posts = new List<Post>
                    {
                        new()
                        {
                            CreatedDate = DateTime.Now,
                            Message = "Hello Hello",
                        }
                    }
                };

                await context.Users.AddRangeAsync(user);
                await context.Users.AddRangeAsync(user2);
                await context.Users.AddRangeAsync(user3);
                
                await context.SaveChangesAsync();
            }
        }
    }
}

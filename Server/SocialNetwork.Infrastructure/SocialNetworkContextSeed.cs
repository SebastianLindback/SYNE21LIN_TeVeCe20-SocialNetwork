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

                await context.Users.AddRangeAsync(user);
                await context.Users.AddRangeAsync(user2);
                
                await context.SaveChangesAsync();
            }

             if (!context.Subscriptions.Any())
            {

                var subscription = new Subscription
                {
                    Id = 1,
                    SubscribedTo = new User{ 
                    Name = "Robert Jansz"
                    },
                
                  
                    Subscriber = new User{ 
                    Name = "Jonny Cage "
                    },
                  
                    CreatedDate = DateTime.Now
                };

               
                
                

                await context.Subscriptions.AddRangeAsync(subscription);
                
                await context.SaveChangesAsync();
            }
        }
    }
}

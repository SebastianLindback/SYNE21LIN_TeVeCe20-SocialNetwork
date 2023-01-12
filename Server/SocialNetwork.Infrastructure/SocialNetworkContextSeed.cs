using SocialNetwork.Entity;

namespace SocialNetwork.Infrastructure
{
    public class SocialNetworkContextSeed
    {
        public static async Task SeedAsync(SocialNetworkContext context)
        {
            if (!context.Users.Any())
            {

                var users = new List<User>{ 
                new User
                {
                    Name = "Robert Jansz",
                    
                },
                new User
                {
                    Name = "Johnny Cage",
                    
                },
                new User
                {
                    Name = "Jane Doe",
                    
                },
                new User
                {
                    Name = "John Doe ",
                    
                },
                };
                await context.Users.AddRangeAsync(users);

                await context.SaveChangesAsync();
            }
            if (!context.Posts.Any()){
                List<Post> posts = new List<Post>{
                new Post
                {
                    Message = "Hello 2!",
                    CreatedDate = DateTime.Now.AddMinutes(-1),
                    SenderId = 1,
                    ReceiverId = 2,
                },
                new Post
                {
                    Message = "Hello 1!",
                    CreatedDate = DateTime.Now.AddMinutes(-2),
                    SenderId = 2,
                    ReceiverId = 1,
                },
                new Post
                {
                    Message = "Hello 3!",
                    CreatedDate = DateTime.Now.AddMinutes(-3),
                    SenderId = 3,
                    ReceiverId = 4,
                },
                new Post
                {
                    Message = "Hello 4!",
                    CreatedDate = DateTime.Now.AddMinutes(-4),
                    SenderId = 4,
                    ReceiverId = 3,
                }
                };

                await context.Posts.AddRangeAsync(posts);

                await context.SaveChangesAsync();
            }
            if (!context.Subscriptions.Any())
            {

                var subscription = new Subscription
                {
                    SubscriberId = 1,
                    SubscribedToId = 2,
                    CreatedDate = DateTime.Now
                };

                await context.Subscriptions.AddRangeAsync(subscription);

                await context.SaveChangesAsync();
            }

            if (!context.Messages.Any() && context.Users.Any())
            {
                var user1 = context.Users.Where(x => x.Id == 1).FirstOrDefault();
                var user2 = context.Users.Where(x => x.Id == 2).FirstOrDefault();
                var messages = new List<Message>{
                    new Message{
                        Content = "test message to user 1",
                        Sender = user2,
                        Receiver = user1,
                        CreatedDate = DateTime.Now
                    },
                    new Message{
                        Content = "test message to user 2",
                        Sender = user1,
                        Receiver = user2,
                        CreatedDate = DateTime.Now
                    },
                    new Message{
                        Content = "test response to user 1",
                        Sender = user2,
                        Receiver = user1,
                        CreatedDate = DateTime.Now
                    },
                    new Message{
                        Content = "test response to user 2",
                        Sender = user1,
                        Receiver = user2,
                        CreatedDate = DateTime.Now
                    },
                }; 

                await context.Messages.AddRangeAsync(messages);
                
                await context.SaveChangesAsync();
            }
        }
    }
}

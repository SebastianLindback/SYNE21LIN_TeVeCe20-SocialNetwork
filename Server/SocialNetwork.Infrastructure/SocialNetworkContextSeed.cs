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
                    
                };

                var user2 = new User
                {
                    Name = "Jonny Cage ",
                    
                };

                await context.Users.AddRangeAsync(user);
                await context.Users.AddRangeAsync(user2);

                await context.SaveChangesAsync();
            }
            if (!context.Posts.Any()){
                var post = new Post
                {
                    Message = "Hello World!",
                    CreatedDate = DateTime.Now.AddMinutes(-30),
                    SenderId = 1,
                    ReceiverId = 2,
                };

                var post2 = new Post
                {
                    Message = "Hello Again!",
                    CreatedDate = DateTime.Now,
                    SenderId = 2,
                    ReceiverId = 1,
                };

                await context.Posts.AddRangeAsync(post);
                await context.Posts.AddRangeAsync(post2);

                await context.SaveChangesAsync();
            }
            if (!context.Subscriptions.Any())
            {

                var subscription = new Subscription
                {
                    Id = 1,
                    SubscribedTo = new User
                    {
                        Name = "Robert Jansz"
                    },


                    Subscriber = new User
                    {
                        Name = "Jonny Cage "
                    },

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

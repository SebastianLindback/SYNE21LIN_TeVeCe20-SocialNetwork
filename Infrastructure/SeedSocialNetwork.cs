using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Entity;
using Microsoft.Extensions.Logging;

namespace Infrastructure;

public class SeedSocialNetwork
{
    public static async Task SeedAsync(SocialNetworkContext context, ILogger logger){
        try {
                if (!context.Posts!.Any())
                {
                   var postsData = File.ReadAllText("../Infrastructure/SeedData/DummyPosts.json");
                   var posts = JsonSerializer.Deserialize<List<Post>>(postsData);
                  foreach (var item in posts!)
                  {
                        item.Id = new Guid();
                        context.Posts!.Add(item);
                  }

                  await context.SaveChangesAsync();
                   
                }   
            }
            catch(Exception ex)
            {
                   logger.LogError(ex.Message);
            }
    }
}

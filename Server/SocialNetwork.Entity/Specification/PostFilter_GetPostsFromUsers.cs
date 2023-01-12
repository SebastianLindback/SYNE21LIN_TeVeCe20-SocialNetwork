using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class PostFilter_GetPostsFromUsers : BaseSpecification<Post>
{
    public PostFilter_GetPostsFromUsers(int[] UsersId) : base(x => (
        (UsersId.Contains(x.SenderId))
        ))
    {
        
        IncludeMethod(x => x.Receiver!);
        IncludeMethod(x => x.Sender!);
        SortByDescendingMethod(x => x.CreatedDate);
    }
}
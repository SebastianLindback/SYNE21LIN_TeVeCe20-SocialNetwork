using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class PostFilter_GetPostsToUser : BaseSpecification<Post>
{
    public PostFilter_GetPostsToUser(int toUserId) : base(x => (
        (x.ReceiverId == toUserId)
        ))
    {
    }
}
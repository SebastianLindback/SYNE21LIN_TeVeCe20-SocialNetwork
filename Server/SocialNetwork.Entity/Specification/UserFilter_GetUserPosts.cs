using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class UserFilter_GetUserPosts : BaseSpecification<User>
{
    public UserFilter_GetUserPosts(int[] ids) : base(x => (
        (ids.Contains(x.Id))
        ))
    {
        IncludeMethod(x => x.Posts);
    }
}
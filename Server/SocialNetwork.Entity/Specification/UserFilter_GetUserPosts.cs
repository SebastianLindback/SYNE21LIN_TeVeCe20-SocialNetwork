using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class UserFilter_GetUserPosts : BaseSpecification<User>
{
    public UserFilter_GetUserPosts(int id) : base(x => (
        (x.Id == id)
        ))
    {
        IncludeMethod(x => x.Posts);
    }
}
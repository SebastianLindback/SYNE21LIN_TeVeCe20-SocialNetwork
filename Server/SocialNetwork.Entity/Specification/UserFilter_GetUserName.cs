using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class UserFilter_GetUserName : BaseSpecification<User>
{
    public UserFilter_GetUserName(string name) : base(x => (
        (x.Name == name)
        ))
    {
    }
}
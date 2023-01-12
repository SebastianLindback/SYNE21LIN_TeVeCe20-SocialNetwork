using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class Subscribe_Filter_GetUser_Subscribtions: BaseSpecification<Subscription>
{
    public Subscribe_Filter_GetUser_Subscribtions(int Id) : base(x => (
        (x.SubscriberId == Id)
        ))
    {
        SortByDescendingMethod(x => x.CreatedDate);
    }
}
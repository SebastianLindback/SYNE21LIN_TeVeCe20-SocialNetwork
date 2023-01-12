using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class Subscribe_Filter_GetSubscribtions: BaseSpecification<Subscription>
{
    public Subscribe_Filter_GetSubscribtions(int subscriber, int SubscribedTo) : base(x => (
       (x.SubscriberId == subscriber && x.SubscribedToId == SubscribedTo)
        ))
    {
        SortByDescendingMethod(x => x.CreatedDate);
    }
}
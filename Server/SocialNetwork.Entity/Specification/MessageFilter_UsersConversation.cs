using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class MessageFilter_UsersConversation : BaseSpecification<Message>
    {   
        public MessageFilter_UsersConversation(int userA, int userB) : base(x => (
            (x.ReceiverId == userA && x.SenderId == userB)
            ||
            (x.ReceiverId == userB && x.SenderId == userA)
            ))
        {
            IncludeMethod(x => x.Receiver);
            IncludeMethod(x => x.Sender);
            SortByDescendingMethod(x => x.CreatedDate);
        }

    }
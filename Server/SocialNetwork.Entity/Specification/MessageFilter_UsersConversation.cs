using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialNetwork.Entity;

namespace SocialNetwork.Entity.Specification;
public class MessageFilter_UsersConversation : BaseSpecification<Message>
    {   
        public MessageFilter_UsersConversation(int userA, int userB) : base(x => (
            (x.FK_ReceiverId == userA && x.FK_SenderId == userB)
            ||
            (x.FK_ReceiverId == userB && x.FK_SenderId == userA)
            ))
        {
            SortByDescendingMethod(x => x.CreatedDate);
        }

    }
import React from 'react'
import { Link } from 'react-router-dom'
import { Subscription } from '../../models/Subscription'
import moment from 'moment'

interface props {
    subscription: Subscription
    buttons? : JSX.Element[]
}

export default function SubscriptionElement({subscription, buttons} : props) {
  return (
    <div className="mx-auto UserInformation col-sm-12 col-md-6" key={subscription.id}>
        <Link to={`/user/1/${subscription.subscribedToId}`}>
            <img
            className="mr-3 rounded-circle"
            src={`https://i.pravatar.cc/75?=${subscription.subscribedToId}`}
            alt={`profile of subscription.name}`}
            />
        </Link>
        <h4>{subscription.name}</h4>
        <span className="text-white">Subscribed since: {moment(subscription.createdDate).format("YYYY-MM-DD") }</span>
        
        <div className='d-flex flex-row justify-content-around'>
        {buttons}
        </div>
    </div>
  )
}

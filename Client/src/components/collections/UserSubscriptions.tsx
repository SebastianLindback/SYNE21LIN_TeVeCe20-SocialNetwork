import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import moment from 'moment';
import React from 'react'
import { useParams, Link } from 'react-router-dom';
import Agent from '../../actions/Agent';
import { SubscribersResponse } from '../../models/SubscribersResponse';
import SubscribeButton from '../buttons/SubscribeButton';
import ErrorPage from '../../pages/shared/ErrorPage';
import SubscriptionElement from '../elements/SubscriptionElement';
import MessageButton from '../buttons/MessageButton';
import LoadingPage from '../../pages/shared/LoadingPage';

export default function UserSubscriptions() {
    const { subscriptionId } = useParams<{ subscriptionId: string }>();
    const { data, isLoading, error } = useQuery<SubscribersResponse, AxiosError>({
    queryKey: ["subscriptions-user_" + subscriptionId],
        retry: () => false,
        queryFn: () => Agent.Subscription.All(subscriptionId).then((response) => response),
     });

    if (error) return <ErrorPage error={error}/>

    if (isLoading) return <div className="container"><LoadingPage/></div>

    return (
    <div className="row">
        {data?.subscriptions.length > 0 ? 
        
        data?.subscriptions.map((subscription) => (
            <SubscriptionElement key={data.subscriptions.indexOf(subscription)}  subscription={subscription} buttons={[
                <SubscribeButton fromUser="1" toUser={`${subscription.subscribedToId}`}/>,
                <MessageButton fromUser="1" toUser={`${subscription.subscribedToId}`}/>]}
            />
        ))
        :
        <span className='row mx-auto py-5 text-white text-center'>No subscriptions found. Go and follow some users!</span>

        }
    </div>
    )
}

import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import Agent from './Agent';

export function GetSubscriptionStatus(fromUser: string, toUser: string) {
    let subscriptionStatus = false;
    const { data : currentSubscription} = useQuery({
        queryKey: [`current-sub-${fromUser}-${toUser}`],
        queryFn: () => Agent.Subscription.All(fromUser).then((response) => response),
    });

    var currentlySubscribed = currentSubscription &&
    currentSubscription.subscriptions.filter(subscription => subscription.subscribedToId === +toUser)?.length; 
    if (currentlySubscribed) subscriptionStatus = true

    return subscriptionStatus
}

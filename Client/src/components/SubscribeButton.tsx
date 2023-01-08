import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import Agent from '../actions/Agent';
import { AxiosError } from 'axios';
import {GetSubscriptionStatus} from '../actions/useSubscription';

enum FollowStates {
    neutral = "primary",
    success = "success",
    error = "danger"
}

interface settings{
    text : string,
    disabled : boolean,
    color : FollowStates
}

interface props {
    fromUser : string, 
    toUser : string
}

export default function SubscribeButton({fromUser,toUser } : props)
{
    const [followState, setFollowState] = useState(FollowStates.neutral)
    const [errorMessage, setErrorMessage] = useState("")

    const default_setting_neutral = {text:"follow", disabled: false, color: FollowStates.neutral } as settings;
    const default_setting_error = {text:errorMessage, disabled: true, color: FollowStates.error } as settings;
    const default_setting_success = {text:"follow", disabled: true, color: FollowStates.success } as settings;

    const currentlySubscribed = GetSubscriptionStatus(fromUser, toUser)
    if (currentlySubscribed && followState !== FollowStates.success) {        
        setFollowState(FollowStates.success);
    }
    
    let current_setting = default_setting_neutral;
    if (followState === FollowStates.success) current_setting = default_setting_success    
    if (followState === FollowStates.error) current_setting = default_setting_error
    
    const {mutate : subscribeToUser} = useMutation(() => { return Agent.Subscription.Subscribe(fromUser,toUser).then(res => res)},
    {
        onSuccess : () => {
            setFollowState(FollowStates.success)
        },
        onError : (error : AxiosError) => {
            setFollowState(FollowStates.error)
            setErrorMessage(error?.response!.data as string)
        }
    });

    return (
        <button type="button" 
                onClick={() => subscribeToUser()} 
                disabled={current_setting.disabled} 
                className={`btn btn-${current_setting.color} m-4`}
        >
        {current_setting.text}
        </button>
    )
}


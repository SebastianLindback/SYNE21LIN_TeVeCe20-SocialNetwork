import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { CSSProperties, useState } from 'react'
import Agent from '../../actions/Agent';
import { AxiosError } from 'axios';
import {GetSubscriptionStatus} from '../../actions/useSubscription';

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
    toUser : string,
    style? : CSSProperties
}

export default function SubscribeButton({fromUser, toUser, style } : props)
{
    const queryClient = useQueryClient();
    const querykeys = ["wallData", ["subscriptions-user_" + fromUser]]
    const [followState, setFollowState] = useState(FollowStates.neutral)
    const [errorMessage, setErrorMessage] = useState("")

    const default_setting_neutral = {text:"Follow", disabled: false, color: FollowStates.neutral } as settings;
    const default_setting_error = {text:errorMessage, disabled: true, color: FollowStates.error } as settings;
    const default_setting_success = {text:"Stop Following", disabled: false, color: FollowStates.success } as settings;

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

    const {mutate : unSubscribeToUser} = useMutation(() => { return Agent.Subscription.Del(fromUser,toUser).then(res => res)},
    {
        onSuccess : () => {
            
            setFollowState(FollowStates.neutral)
            queryClient.invalidateQueries(querykeys);
            queryClient.refetchQueries(querykeys);
        },
        onError : (error : AxiosError) => {
            setFollowState(FollowStates.error)
            setErrorMessage(error?.response!.data as string)
        }
    });

    return (
    
        <button type="button" 
                onClick={() => followState === FollowStates.neutral ? subscribeToUser() : unSubscribeToUser()} 
                disabled={current_setting.disabled} 
                className={`btn btn-${current_setting.color} m-4`}
                style={style}
        >
        {current_setting.text}
        </button>
    )
}


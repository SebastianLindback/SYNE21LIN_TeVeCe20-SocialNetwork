import { useMutation, useQuery } from '@tanstack/react-query'
import Agent from '../actions/Agent'
import { useState } from 'react';
import { AxiosError } from 'axios';

interface props {
    fromUser? : string,
    toUser : string
}

function Follow({fromUser = "1", toUser} : props) {
    enum FollowStates {
        neutral = "primary",
        success = "success",
        error = "danger"
    }
    const [followState, setFollowState] = useState(FollowStates.neutral)
    const [errorMessage, setErrorMessage] = useState("")
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

    const { data : currentSubscription} = useQuery({
        queryKey: [`current-sub-${fromUser}-${toUser}`],
        queryFn: () => Agent.Subscription.All(fromUser).then((response) => response),
    });

    var currentlySubscribed = currentSubscription &&
    currentSubscription.subscriptions.filter(subscription => subscription.subscribedToId === +toUser)?.length; 
    if (currentlySubscribed && followState !== FollowStates.success) {        
        setFollowState(FollowStates.success);
    }

    const buttonDesign = (btnText : string,btnColor : string,btnDisabled : boolean) => {
        return (
            <button type="button" 
                    onClick={() => subscribeToUser()} 
                    disabled={btnDisabled} 
                    className={`btn btn-${btnColor} m-4`}
            >
            {btnText}
            </button>
        )
    }
    if (followState === FollowStates.success) return buttonDesign("Followed", FollowStates.success, true)

    if (followState === FollowStates.error) return buttonDesign(errorMessage.length > 0 ? errorMessage : "Issue", FollowStates.error, true)

    return buttonDesign("Follow", FollowStates.neutral, false)
}

export default Follow
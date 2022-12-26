import { useMutation } from '@tanstack/react-query'
import Agent from '../actions/Agent'
import { useState } from 'react';

interface props {
    fromUser? : string,
    toUser : string
}

function Follow({fromUser = "0", toUser} : props) {
    enum btnStates {
        neutral = "primary",
        success = "success",
        error = "danger"
    }
    const [followState, setFollowState] = useState(btnStates.neutral)
    const {mutate : subscribeToUser} = useMutation(() => { return Agent.Subscription.Subscribe(fromUser,toUser).then(res => res)},
    {
        onSuccess : () => {
            setFollowState(btnStates.success)
        },
        onError : (data) => {
            setFollowState(btnStates.error)
            console.log(data);
        }
    });
    return (
        <button type="button" disabled={!btnStates.neutral ? true : false } onClick={() => subscribeToUser()} className={`btn btn-${followState} m-4`}>
            {followState === btnStates.neutral ? "Follow" : null}
            {followState === btnStates.success ? "Followed" : null}
            {followState === btnStates.error ? "Issue" : null}
        </button>
    )
}

export default Follow
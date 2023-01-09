import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { AxiosError } from 'axios';
import Agent from '../../actions/Agent';

enum FollowStates {
    neutral = "primary",
    error = "danger"
}

interface settings{
    text : string,
    disabled : boolean,
    color : FollowStates
}

interface props {
    userId : string,
}

export default function DeleteUserButton({userId } : props)
{
    const [followState, setFollowState] = useState(FollowStates.neutral)
    const [errorMessage, setErrorMessage] = useState("")

    const default_setting_neutral = {text:"Delete", disabled: false, color: FollowStates.error } as settings;
    const default_setting_error = {text:errorMessage, disabled: true, color: FollowStates.error } as settings;
    
    let current_setting = default_setting_neutral; 
    if (followState === FollowStates.error) current_setting = default_setting_error
    
    const {mutate : deleteUser} = useMutation(() => { return Agent.Users.Del(userId).then(res => res)},
    {
        onSuccess : (data) => {
            alert(data)
        },
        onError : (error : AxiosError) => {
            setFollowState(FollowStates.error)
            setErrorMessage(error?.response!.data as string)
        }
    });

    return (
    
        <button type="button" 
                onClick={() => deleteUser()} 
                disabled={current_setting.disabled} 
                className={`btn btn-${current_setting.color} m-4`}
        >
        {current_setting.text}
        </button>
    )
}


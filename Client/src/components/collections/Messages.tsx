import Moment from 'moment';
import { MessagesResponse } from '../../models/MessagesResponse';
import React from 'react';

interface props {
    response : MessagesResponse
}

const Messages = ({response} : props) => {
    
    return <>
    {response! && response.messages?.map((message) => (
        <div className='card col-6 mx-auto m-5 ' key={response.messages.indexOf(message)} >
                <div className='card-header mt-3 row'>
                    <p className='card-title col-6'>From: <a href={`${process.env.PUBLIC_URL}/user/${message.senderId}`}>{message.sender}</a> </p>
                    <p className='card-subtitle mb-2 text-muted col-6'>To: {message.receiver}</p>
                </div>
                <div className='card-body'>
                    <p className='card-text'>{message.content}</p>
                </div>
                <div className='card-footer row'>
                    <p className='text-muted col-6'>- {Moment(message.createdDate).format("Do MMM YYYY - HH:MM") }</p>
                </div>
                
            </div>
        )
    )}</>
}

export default Messages;
import React from 'react'
import { Message } from '../../models/Message'
import { Link } from 'react-router-dom'
import moment from 'moment'

interface props {
    message: Message
}

export default function MessageElement({message} : props) {
  return (
    <div className='card col-6 mx-auto m-5 ' key={message.id} >
        <div className='card-header mt-3 row d-flex flex-row'>
            <p className='card-title col-6'>From: <Link to={`/user/1/${message.senderId}`}>{message.sender}</Link> </p>
            <p className='card-title text-muted col-6'>To: {message.receiver}</p>
        </div>
        <div className='card-body'>
            <p className='card-text'>{message.content}</p>
        </div>
        <div className='card-footer row'>
            <p className='text-muted col-6'>- {moment(message.createdDate).format("Do MMM YYYY - HH:MM") }</p>
        </div>
        
    </div>
  )
}

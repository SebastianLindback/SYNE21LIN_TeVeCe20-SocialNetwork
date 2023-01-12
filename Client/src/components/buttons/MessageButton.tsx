import React from 'react'
import { Link } from 'react-router-dom'

interface props {
    fromUser : string, 
    toUser : string,
}


export default function MessageButton({fromUser = "1", toUser} : props) {
  return (
    <Link to={`/conversation/${fromUser}/${toUser}`}>
        <button id="MessageButton" className="btn btn-primary m-4">Message</button>
    </Link>
  )
}

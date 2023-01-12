import React from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../models/User'

interface props {
    user: User
    buttons? : JSX.Element[]
}

export default function UserElement({user, buttons} : props) {
  return (
    <div className="UserInformation mx-auto col-md-6 col-sm-12"  key={user.id}>
        <Link to={`/user/1/${user.id}`}>
        <img
            className="mr-3 rounded-circle"
            src={`https://i.pravatar.cc/75?=${user.id}`}
            alt={`profile of ${user.name}}`}
        />
        </Link>


        <Link to={`/user/1/${user.id}`} className={"text-white"}><h4>{user.name}</h4></Link>
        
        <div className='d-flex flex-row justify-content-around'>
        {buttons}
        </div>
    </div>
  )
}

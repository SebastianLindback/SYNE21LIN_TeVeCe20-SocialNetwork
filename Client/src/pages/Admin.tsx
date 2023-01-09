import React from 'react'
import CreateUserForm from '../components/CreateUserForm'
import AllUsers from '../components/AllUsers'

export default function Admin() {
  return (<>
    <div className='row mx-auto'>
    <CreateUserForm  />
    </div>
    <h2 className='text-white text-center'>All Users</h2>
    <AllUsers/>
    </>
    )
}

import React from 'react'
import CreateUserForm from '../components/forms/CreateUserForm'
import DeleteUsers from '../components/collections/DeleteUsers'
import Heading from '../components/Heading'

export default function Admin() {
  return (<>
    <div className='container'>

    {/* HEADER */}
    <Heading title='Admin' subtitle='Create and delete users'/>

    <hr style={{borderTop:"20px solid rgb(7 7 8 / 15%)"}} />

    {/* CONTENT */}
    <div className='row mx-auto'>
    <CreateUserForm  />
    </div>

    <h2 className='text-white text-center'>All Users</h2>
    <DeleteUsers/>
    </div>
    </>
    )
}

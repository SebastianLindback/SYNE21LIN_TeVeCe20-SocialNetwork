import React from 'react'
import AllUsers from '../components/collections/AllUsers'
import Heading from '../components/Heading'

export default function Explore() {
  return (<>
  
  <div className="container">
    {/* HEADER */}
    <Heading title='Explore other users' subtitle='Will display all users'/>

    {/* CONTENT */}
    <AllUsers/>
    </div>
    </>
  )
}

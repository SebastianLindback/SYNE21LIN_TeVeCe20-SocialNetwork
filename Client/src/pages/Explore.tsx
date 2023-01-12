import React from 'react'
import AllUsers from '../components/collections/AllUsers'
import Heading from '../components/Heading'
import NavMenu from '../components/NavMenu'

export default function Explore() {
  return (<>
  
  <div className="container">
      {/* MENU */}
      <NavMenu menuItems={[
        {to:"/", text:"My feed"},
        {to:"/user/1/1", text:"My public wall"},
      ]}/>

    {/* HEADER */}
    <Heading title='Explore other users' subtitle='Will display all users'/>

    {/* CONTENT */}
    <AllUsers/>
    </div>
    </>
  )
}

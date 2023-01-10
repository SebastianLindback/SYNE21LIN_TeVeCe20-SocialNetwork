import React from 'react'
import { useNavigate } from 'react-router-dom'

interface menuItem{
    to:string,
    text:string
}
interface props {
    menuItems : menuItem[]
}

export default function NavMenu({menuItems} : props) {
    const navigate = useNavigate();
    const items = menuItems.map(menuItem => <button className="menuItem" onClick={() => {navigate(menuItem.to)}}>{menuItem.text}</button>)
  return (
    <div className="row justify-content-between p-2 mx-auto" style={{maxWidth:"800px"}}>
        {items}
    </div>
  )
}

import React from 'react'
interface props {
  title : string,
  subtitle? : string
}

export default function Heading({title, subtitle} : props) {
  return (
    <div className="row d-flex flex-column">
    <h2 className="text-white text-center text-uppercase">{title}</h2>
    {
      subtitle && <span className="text-white text-center text-uppercase">{subtitle}</span>
    }
  </div>
  )
}

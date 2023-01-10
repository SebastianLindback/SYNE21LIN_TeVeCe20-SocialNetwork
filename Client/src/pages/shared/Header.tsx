import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
  return (
    <div className="header" onClick={() => navigate("/")}>
        <img
        className="Logo"
        src={require("../../photos/SocialMediaLogo.png")}
        alt=""
        />
        <h1 className="display-1 center">
        Lazy<strong>Book</strong>
        </h1>
    </div>
  )
}

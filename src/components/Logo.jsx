import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="olm-logo">
      <img 
        src="/olm/OLM-Logo 1.png" 
        alt="OLM International Job Placement Corporation" 
        className="logo-image"
      />
    </Link>
  )
}

export default Logo

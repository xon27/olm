import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

const LOGO_SRC = {
  default: '/olm/olm-logo.png',
  footer: '/olm/olm-footer.jpg',
}

const Logo = ({ variant = 'default' }) => {
  return (
    <Link to="/" className={`olm-logo olm-logo--${variant}`}>
      <img
        src={LOGO_SRC[variant] ?? LOGO_SRC.default}
        alt="OLM International Job Placement Corporation"
        className="logo-image"
      />
    </Link>
  )
}

export default Logo

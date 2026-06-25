import React from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/assets'
import './Logo.css'

const LOGO_SRC = {
  default: asset('olm-logo.png'),
  footer: asset('olm-footer.jpg'),
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

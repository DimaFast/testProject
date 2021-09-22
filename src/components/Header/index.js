import React from 'react'
import { Link } from 'react-router-dom'

import routes from '../../routes'

import './styles.css'

const Header = () => {
  return (
    <section className="header">
      <div className="headerInner">
        <Link
          to={localStorage.getItem('userLogin') ? routes.profile : routes.signUp}
          className="headerProfile"
        >
          Profile
        </Link>
        <Link to={routes.signIn} className="headerIn">
          Sign In
        </Link>
        <Link to={routes.signUp} className="headerUp">
          Sign Up
        </Link>
        <Link to={routes.list} className="headerUp">
          List
        </Link>
      </div>
    </section>
  )
}

export default Header

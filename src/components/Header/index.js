import React from 'react'
import { Link } from 'react-router-dom'

import routes from '../../routes'
import { getItem } from '../../localStorage'

import './styles.css'

const Header = () => {
  const route = getItem('userLogin') ? routes.profile : routes.signUp

  return (
    <section className="header">
      <div className="headerInner">
        <Link to={route} className="headerProfile">
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

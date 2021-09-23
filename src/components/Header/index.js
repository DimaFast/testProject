import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from '../../routes'

import './styles.css'

const Header = () => {
  const user = useSelector((state) => state?.user?.data)
  const route = user ? routes.profile : routes.signUp

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

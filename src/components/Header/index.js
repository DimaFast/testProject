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
        <Link to={route} className="headerLink">
          Profile
        </Link>
        <Link to={routes.signIn} className="headerLink">
          Sign In
        </Link>
        <Link to={routes.signUp} className="headerLink">
          Sign Up
        </Link>
        <Link to={routes.list} className="headerLink">
          List
        </Link>
      </div>
    </section>
  )
}

export default Header

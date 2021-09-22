import React from 'react'

import Header from '../Header'
import './styles.css'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout

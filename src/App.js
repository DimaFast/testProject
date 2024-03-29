import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { getUser } from './api/user'
import Router from './Router'

import 'rc-slider/assets/index.css'
import './App.css'

function App() {
  const [isLoaded, setLoaded] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getUser()
      .then((data) => dispatch({ type: 'CREATE_USER', payload: data }))
      .finally(() => setLoaded(false))

    return () => setLoaded(true)
  }, [])

  if (isLoaded) {
    return null
  }

  return <Router />
}

export default App

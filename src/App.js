import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Router from './Router'
import { getUser } from './api/user'

import './App.css'

function App() {
  const [isLoaded, setLoaded] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    getUser()
      .then((data) => {
        dispatch({ type: 'CREATE_USER', payload: data })
      })
      .finally(() => setLoaded(false))

    return () => setLoaded(true)
  }, [])
  if (isLoaded) {
    return null
  }
  return <Router />
}

export default App

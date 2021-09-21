import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import routes from './routes'
import SignUp from './pages/signUp'
import SignIn from './pages/signIn'
import Home from './pages/home'
import Profile from './pages/profile'
import List from './pages/list'
import ChangeList from './pages/changeList'

import 'bootstrap/dist/css/bootstrap.min.css'

const Router = () => {
  const [user, setUser] = useState({})
  const pages = [
    {
      path: routes.home,
      name: 'home',
      Component: Home,
      exact: true,
    },
    {
      path: routes.signUp,
      name: 'signUp',
      Component: () => <SignUp setUser={setUser} />,
      exact: true,
    },
    {
      path: routes.signIn,
      name: 'signIn',
      Component: () => <SignIn setUser={setUser} />,
      exact: true,
    },
    {
      path: routes.profile,
      name: 'profile',
      Component: () => <Profile user={user} setUser={setUser} />,
      exact: true,
    },
    {
      path: routes.list,
      name: 'list',
      Component: List,
    },
    {
      path: routes.changeList,
      name: 'changeList',
      Component: ChangeList,
      exact: true,
    },
  ]

  return (
    <BrowserRouter>
      <Switch>
        {pages.map((route) => (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={route.Component}
          />
        ))}
        <Route path="*" component={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router

import React from 'react'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import routes from '../../routes'
import { deleteUser } from '../../api/user'
import Layout from '../../components/Layout'

import './styles.css'

const Profile = () => {
  const loginUser = useSelector((state) => state?.user?.data)
  const dispatch = useDispatch()
  const history = useHistory()

  const deleteUserClient = () => {
    deleteUser()
      .then((data) => dispatch({ type: 'DELETE_USER', payload: data }))
      .then(() => history.push(routes.home))
  }

  if (isEmpty(loginUser)) {
    return <Redirect to={routes.signUp} />
  }

  return (
    <Layout>
      <div>
        <section className="profile">
          <div className="profileItem">
            <img src="./logo192.png" alt="Logo" className="profileImg" />
            <div className="profileInnerText">
              <p className="profileLogin">{loginUser?.email}</p>
              <p className="profilePassword">{loginUser?.password}</p>
            </div>
          </div>
          <p onClick={deleteUserClient} className="profileLogout">
            LOGOUT
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default Profile

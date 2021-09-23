import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, isNil } from 'lodash'

import { inUser } from '../../api/user'
import Layout from '../../components/Layout'
import routes from '../../routes'

import './styles.css'

const SignIn = ({ setUserPro }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const loginUser = useSelector((state) => state.user.data)
  console.log(loginUser)
  const onSubmit = (data) => {
    inUser(data, history, setUserPro)
      .then((data) => {
        dispatch({ type: 'CREATE_USER', payload: data })
        setUserPro(data)
      })
      .catch((error) => {
        setError(error.message)
        console.log(error)
      })
  }

  useEffect(() => {
    if (!isNil(loginUser) && !isEmpty(loginUser)) {
      history.push(routes.profile)
    }
  }, [loginUser])

  return (
    <Layout>
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>{error}</p>
          <label style={{ display: 'block' }} className="inputLabel">
            Input Email
          </label>
          <input
            {...register('email', { required: 'Please input email', defaultValue: '' })}
            type="email"
            className="inputSign"
            onFocus={() => setError('')}
          />
          {!errors?.password ? (
            <label style={{ display: 'block' }} className="inputLabel">
              Input Password
            </label>
          ) : (
            <label style={{ display: 'block' }} className="inputLabel">
              Required Password
            </label>
          )}
          <input
            {...register('password', { required: 'Please input password', defaultValue: '' })}
            type="password"
            className="inputSign"
            onFocus={() => setError('')}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  )
}
export default SignIn

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { isEmpty, isNil } from 'lodash'

import routes from '../../routes'
import { inUser } from '../../api/user'
import { EMAIL_FIELD, PASSWORD_FIELD } from '../../constans'
import SimpleInput from '../../components/SimpleInput'
import Layout from '../../components/Layout'

import './styles.css'

const SignIn = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const loginUser = useSelector((state) => state?.user?.data)

  const onSubmit = (data) => {
    inUser(data)
      .then((data) => dispatch({ type: 'CREATE_USER', payload: data }))
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
      <div className="signInInner">
        <h1 className="signInTitle">Sign In profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="formSignIn">
          <p>{error}</p>
          <label style={{ display: 'block', marginRight: 'auto' }} className="inputLabel">
            {!errors?.email ? 'Input email' : 'Required email'}
          </label>
          <SimpleInput
            type={EMAIL_FIELD}
            register={{
              ...register(EMAIL_FIELD, { required: 'Please input email', defaultValue: '' }),
            }}
            onFocus={() => setError('')}
          />
          <label style={{ display: 'block', marginRight: 'auto' }} className="inputLabel">
            {!errors?.password ? 'Input password' : 'Required password'}
          </label>
          <SimpleInput
            type={PASSWORD_FIELD}
            register={{
              ...register(PASSWORD_FIELD, { required: 'Please input password', defaultValue: '' }),
            }}
            onFocus={() => setError('')}
          />

          <button className="signInSubmit" type="submit">
            Submit
          </button>
        </form>
        <hr style={{ height: 2 }} className="betweenBtn" />
        <Link to={routes.signUp} className="formLinkSignUp">
          Sign Up
        </Link>
      </div>
    </Layout>
  )
}
export default SignIn

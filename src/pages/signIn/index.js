import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>{error}</p>
          <label style={{ display: 'block' }} className="inputLabel">
            Input Email
          </label>
          <SimpleInput
            type={EMAIL_FIELD}
            register={{
              ...register(EMAIL_FIELD, { required: 'Please input email', defaultValue: '' }),
            }}
            onFocus={() => setError('')}
          />
          <label style={{ display: 'block' }} className="inputLabel">
            {!errors?.password ? 'Input Password' : 'Required Password'}
          </label>
          <SimpleInput
            type={PASSWORD_FIELD}
            register={{
              ...register(PASSWORD_FIELD, { required: 'Please input password', defaultValue: '' }),
            }}
            onFocus={() => setError('')}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  )
}
export default SignIn

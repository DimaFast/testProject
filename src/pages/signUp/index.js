import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import routes from '../../routes'
import { email, password } from '../../constans'
import { setItem, getItem } from '../../localStorage'
import Layout from '../../components/Layout'

import './styles.css'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const history = useHistory()

  const onSubmit = (data) => {
    setItem('data', [...getItem('data'), data])
    history.push(routes.signIn)
  }
  return (
    <Layout>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={{ display: 'block' }} className="inputLabel">
            Input Email
          </label>
          <input
            {...register(email, { required: 'Please input email', defaultValue: '' })}
            type="email"
            className="inputSign"
          />
          <label style={{ display: 'block' }} className="inputLabel">
            {!errors?.password ? 'Input Password' : 'Required Password'}
          </label>
          <input
            {...register(password, { required: 'Please input password', defaultValue: '' })}
            type="password"
            className="inputSign"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  )
}
export default SignUp

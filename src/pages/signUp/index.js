import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import routes from '../../routes'
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
    localStorage.setItem(
      'data',
      JSON.stringify([...JSON.parse(localStorage.getItem('data')), data])
    )
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
            {...register('email', { required: 'Please input email', defaultValue: '' })}
            type="email"
            className="inputSign"
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
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  )
}
export default SignUp

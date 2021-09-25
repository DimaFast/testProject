import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'

import routes from '../../routes'
import { addUserToDB } from '../../api/user'
import { EMAIL_FIELD, PASSWORD_FIELD } from '../../constans'
import SimpleInput from '../../components/SimpleInput'
import Layout from '../../components/Layout'

import './styles.css'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const history = useHistory()

  const onSubmit = (data) => addUserToDB(data).then(() => history.push(routes.signIn))

  return (
    <Layout>
      <div className="signInInner signUp">
        <h1 className="signInTitle">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="formSignIn">
          <label style={{ display: 'block', marginRight: 'auto' }} className="inputLabel">
            {!errors?.email ? 'Input email' : 'Required email'}
          </label>
          <SimpleInput
            type={EMAIL_FIELD}
            register={{
              ...register(EMAIL_FIELD, {
                required: 'Please input email',
                defaultValue: '',
              }),
            }}
          />
          <label style={{ display: 'block', marginRight: 'auto' }} className="inputLabel">
            {!errors?.password ? 'Input Password' : 'Required Password'}
          </label>
          <SimpleInput
            type={PASSWORD_FIELD}
            register={{
              ...register(PASSWORD_FIELD, { required: 'Please input password', defaultValue: '' }),
            }}
          />
          <button className="signInSubmit" type="submit">
            Submit
          </button>
        </form>
        <hr style={{ height: 2 }} className="betweenBtn" />
        <Link to={routes.signIn} className="formLinkSignUp">
          Sign In
        </Link>
      </div>
    </Layout>
  )
}
export default SignUp

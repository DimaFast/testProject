import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

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
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={{ display: 'block' }} className="inputLabel">
            Input Email
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
          <label style={{ display: 'block' }} className="inputLabel">
            {!errors?.password ? 'Input Password' : 'Required Password'}
          </label>
          <SimpleInput
            type={PASSWORD_FIELD}
            register={{
              ...register(PASSWORD_FIELD, { required: 'Please input password', defaultValue: '' }),
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  )
}
export default SignUp

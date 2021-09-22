import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import { setFilms } from '../../api/films'
import Layout from '../../components/Layout'
import { deleteUser } from '../../api/user'

import './styles.css'

const Profile = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector((state) => state.data.payload)
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const onSubmit = (data) => {
    setFilms(data).then(() => history.push('/list'))
  }
  const deleteUserClient = () => {
    deleteUser()
      .then((data) => dispatch({ type: 'DELETE_USER', payload: data }))
      .then(() => history.push('/'))
  }

  if (isEmpty(loginUser)) {
    return <Redirect to={'/sign-Up'} />
  }

  return (
    <Layout>
      <div>
        <section className="profile">
          <img src="" alt="" className="profileImg" />
          <div className="profileItem">
            <p className="profileLogin">{loginUser.email}</p>
            <p className="profilePassword">{loginUser.password}</p>
          </div>
          <p
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={deleteUserClient}
            className="profileLogout"
          >
            LOGOUT
          </p>
        </section>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="listForm">
          <div>
            <label className="labelList">Name Film</label>
            <input {...register('name')} type="text" className="inputList" />
          </div>
          <div>
            <label className="labelList">Rating Film</label>
            <input {...register('text')} type="text" className="inputList" />
          </div>
          <div>
            <label className="labelList">Film Image</label>
            <input {...register('img')} type="file" className="inputList" />
          </div>
          <button type="submit" className="buttonSave">
            Save
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Profile
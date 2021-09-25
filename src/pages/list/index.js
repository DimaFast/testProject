import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { isEmpty } from 'lodash'

import { changeFilm, getFilms, deleteFilm, setFilms } from '../../api/films'
import ListFilm from '../../components/listFilm'
import Layout from '../../components/Layout'
import ChangeList from '../changeList'

import './styles.css'
import { NAME_FIELD, TEXT_FIELD } from '../../constans'

const List = () => {
  const films = useSelector((state) => state?.films?.data)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const { register, handleSubmit } = useForm()

  const removeFilm = (id) =>
    deleteFilm(id).then((data) => dispatch({ type: 'GET_FILMS', payload: data }))

  const changeFieldId = (id, newData) =>
    changeFilm(id, newData).then((data) => dispatch({ type: 'GET_FILMS', payload: data }))

  const onSubmit = (data) => {
    setFilms(data).then(() => dispatch({ type: 'CREATE_FILMS', payload: data }))
  }

  useEffect(() => {
    getFilms().then((data) => dispatch({ type: 'GET_FILMS', payload: data }))
  }, [])

  return (
    <Layout>
      <section className="sectionFilm">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="listForm">
          <div>
            <label className="labelList">Name Film</label>
            <input {...register(NAME_FIELD)} type="text" className="inputList" />
          </div>
          <div>
            <label className="labelList">Rating Film</label>
            <input {...register(TEXT_FIELD)} type="text" className="inputList" />
          </div>
          <button type="submit" className="buttonSave">
            Save
          </button>
        </form>
        {isEmpty(films) ? (
          <div>
            <p style={{ textAlign: 'center' }}>This list is Empty</p>
          </div>
        ) : (
          films?.map((item, index) => (
            <ListFilm item={item} removeFilm={removeFilm} key={index} setOpen={setOpen} />
          ))
        )}
      </section>

      <Switch>
        <Route path={`${match.path}/:id`}>
          <ChangeList open={open} changeFilm={changeFieldId} setOpen={setOpen} data={films} />
        </Route>
      </Switch>
    </Layout>
  )
}

export default List

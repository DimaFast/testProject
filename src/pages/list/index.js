import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { changeFilm, getFilms, deleteFilm } from '../../api/films'
import ListFilm from '../../components/listFilm'
import Layout from '../../components/Layout'
import ChangeList from '../changeList'

import './styles.css'

const List = () => {
  const films = useSelector((state) => state?.films?.data)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const match = useRouteMatch()

  useEffect(() => {
    getFilms().then((data) => {
      dispatch({ type: 'GET_FILMS', payload: data })
    })
  }, [])

  const removeFilm = (id) => {
    deleteFilm(id).then((data) => {
      dispatch({ type: 'GET_FILMS', payload: data })
    })
  }

  const changeFeildId = (id, newData) => {
    changeFilm(id, newData).then((index) => {
      dispatch({ type: 'GET_FILMS', payload: [...index, newData] })
    })
  }

  return (
    <Layout>
      <section className="sectionFilm">
        {isEmpty(films) ? (
          <></>
        ) : (
          films?.map((Item, index) => (
            <ListFilm item={Item} removeFilm={removeFilm} key={index} setOpen={setOpen} />
          ))
        )}
      </section>

      <Switch>
        <Route path={`${match.path}/:id`}>
          <ChangeList open={open} changeFilm={changeFeildId} setOpen={setOpen} data={films} />
        </Route>
      </Switch>
    </Layout>
  )
}

export default List

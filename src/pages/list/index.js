import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import { changeFilm, getFilms, deleteFilm } from '../../api/films'
import AddFilmModal from '../../components/AddFilmModal'
import ListFilm from '../../components/listFilm'
import Layout from '../../components/Layout'
import ChangeList from '../changeList'

import './styles.css'

const List = () => {
  const films = useSelector((state) => state?.films?.data)
  const [open, setOpen] = useState(false)
  const [openFilm, setOpenFilm] = useState(false)
  const dispatch = useDispatch()
  const match = useRouteMatch()

  const dispatchData = (data) => {
    dispatch({ type: 'GET_FILMS', payload: data })
  }

  const removeFilm = (id) => deleteFilm(id).then((data) => dispatchData(data))

  const changeFieldId = (id, newData) => changeFilm(id, newData).then((data) => dispatchData(data))

  useEffect(() => {
    getFilms().then((data) => dispatchData(data))
  }, [])

  return (
    <Layout>
      <section className="sectionFilm">
        <button style={{ border: 'none' }} onClick={() => setOpenFilm(true)} className="addFilm">
          ADD
        </button>
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
      <AddFilmModal open={openFilm} setOpen={setOpenFilm} />
    </Layout>
  )
}

export default List

import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import ChangeList from '../changeList'
import { changeFilm, getFilms } from '../../api/films'
import { deleteFilm } from '../../api/films'
import ListFilm from '../../components/listFilm'
import Layout from '../../components/Layout'

import './styles.css'

const List = () => {
  const [value, setValue] = useState({})
  const [open, setOpen] = useState(false)
  const match = useRouteMatch()

  useEffect(() => {
    getFilms().then(setValue)
  }, [])

  const removeFilm = (id) => {
    deleteFilm(id).then(() => {
      setValue((oldValue) => oldValue.filter((value) => value.id !== id))
    })
  }

  const changeFilmId = (id, newData) => {
    changeFilm(id, newData).then((index) => {
      setValue([...index, newData])
    })
  }

  return (
    <Layout>
      <section className="sectionFilm">
        {isEmpty(value) ? (
          <></>
        ) : (
          value.map((Item, index) => (
            <ListFilm Item={Item} removeFilm={removeFilm} key={index} setOpen={setOpen} />
          ))
        )}
      </section>
      <Switch>
        <Route path={`${match.path}/:id`}>
          <ChangeList open={open} changeFilm={changeFilmId} setOpen={setOpen} data={value} />
        </Route>
      </Switch>
    </Layout>
  )
}

export default List

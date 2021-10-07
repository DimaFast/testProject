import { random } from 'lodash'

import { FILMS_LIST } from '../constans'
import { setItem, getItem } from '../localStorage'

export const getFilms = async () => {
  return getItem(FILMS_LIST)
}

export const getFilmsId = async (filmId) => {
  const value = getItem(FILMS_LIST)

  return value.find(({ id }) => id === filmId)
}

export const setFilms = async (films) => {
  const filmList = getItem(FILMS_LIST)
  films.id = JSON.stringify(random(0, 100))

  if (filmList !== null) {
    return setItem(FILMS_LIST, [...getItem(FILMS_LIST), films])
  }

  setItem(FILMS_LIST, [films])
}

export const deleteFilm = async (filmId) => {
  const value = getItem(FILMS_LIST)
  const index = value.filter((value) => value.id !== filmId)

  setItem(FILMS_LIST, index)

  return index
}

export const changeFilm = async (filmId, newData) => {
  const value = getItem(FILMS_LIST)
  const newItem = { ...newData, id: filmId }

  const allFilms = value.reduce((prev, curr) => {
    if (curr.id === filmId) {
      curr = newItem
    }
    return [...prev, curr]
  }, [])

  setItem(FILMS_LIST, allFilms)

  return allFilms
}

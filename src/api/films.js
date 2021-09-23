import { random } from 'lodash'

import { setItem, getItem, removeItem } from '../localStorage'

export const getFilms = async () => {
  return getItem('films')
}

export const getFilmsId = async (filmId) => {
  const value = getItem('films')
  return value.find(({ id }) => id === filmId)
}

export const setFilms = async (films) => {
  films.id = JSON.stringify(random(0, 100))
  setItem('films', [...getItem('films'), films])
}

export const deleteFilm = async (filmId) => {
  const value = getItem('films')
  const index = value.filter((value) => value.id !== filmId)
  removeItem('films')
  setItem('films', index)
  return index
}

export const changeFilm = async (filmId, newData) => {
  newData.id = JSON.stringify(random(0, 100))
  const value = getItem('films')
  const index = value.filter((value) => value.id !== filmId)
  removeItem('films')
  setItem('films', [...index, newData])
  return index
}

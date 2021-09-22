import { random } from 'lodash'

export const getFilms = async () => {
  return JSON.parse(localStorage.getItem('films'))
}

export const getFilmsId = async (filmId) => {
  const value = await JSON.parse(localStorage.getItem('films'))
  return value.find(({ id }) => id === filmId)
}

export const setFilms = async (films) => {
  films.id = JSON.stringify(random(0, 100))
  console.log(films)
  localStorage.setItem(
    'films',
    JSON.stringify([...JSON.parse(localStorage.getItem('films')), films])
  )
}

export const deleteFilm = async (filmId) => {
  const value = await JSON.parse(localStorage.getItem('films'))
  const index = value.filter((value) => value.id !== filmId)
  localStorage.removeItem('films')
  localStorage.setItem('films', JSON.stringify(index))
}

export const changeFilm = async (filmId, newData) => {
  newData.id = random(0, 100)
  const value = await JSON.parse(localStorage.getItem('films'))
  const index = value.filter((value) => value.id !== filmId)
  localStorage.removeItem('films')
  localStorage.setItem('films', JSON.stringify([...index, newData]))
  return index
}

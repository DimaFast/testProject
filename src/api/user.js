import { setItem, getItem, removeItem } from '../localStorage'

export const zinUser = async (data) => {
  const localStore = getItem('data')
  const user = localStore.find(
    ({ email, password }) => data.email === email && data.password === password
  )

  if (user) {
    setItem('userLogin', data)
    return getItem('userLogin')
  } else {
    throw new Error('Oops!')
  }
}

export const getUser = async () => {
  return getItem('userLogin')
}

export const deleteUser = async () => {
  removeItem('userLogin')
}

import { setItem, getItem, removeItem } from '../localStorage'

export const inUser = async (data) => {
  const localStore = getItem('data')
  const user = localStore.find(
    (mass) => data.email === mass.email && data.password === mass.password
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

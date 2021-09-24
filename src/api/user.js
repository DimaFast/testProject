import { USER_LIST, LOGIN_USER } from '../constans'
import { setItem, getItem, removeItem } from '../localStorage'

export const inUser = async (data) => {
  const localStore = getItem(USER_LIST)
  const user = localStore.find(
    ({ email, password }) => data.email === email && data.password === password
  )

  if (user) {
    setItem(LOGIN_USER, data)
    return getItem(LOGIN_USER)
  } else {
    throw new Error('Oops!')
  }
}

export const getUser = async () => {
  return getItem(LOGIN_USER)
}

export const deleteUser = async () => {
  removeItem(LOGIN_USER)
}

export const addUserToDB = async (value) => {
  const userList = getItem(USER_LIST)

  if (userList !== null) {
    return setItem(USER_LIST, [...getItem(USER_LIST), value])
  }
  setItem(USER_LIST, [value])
}

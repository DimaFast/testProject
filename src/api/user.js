export const inUser = async (data, history) => {
  const localStore = JSON.parse(localStorage.getItem('data'))
  const user = localStore.find(
    (mass) => data.email === mass.email && data.password === mass.password
  )
  if (user) {
    localStorage.setItem('userLogin', JSON.stringify(data))
    // history.push('/profile')
    return JSON.parse(localStorage.getItem('userLogin'))
  } else {
    throw new Error('Oops!')
  }
}

export const getUser = async () => {
  return JSON.parse(localStorage.getItem('userLogin'))
}

export const deleteUser = async () => {
  localStorage.removeItem('userLogin')
}

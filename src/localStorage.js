import { isObject } from 'lodash'

const engine = window.localStorage

const setItem = (key, value) => {
  if (isObject(value)) {
    value = JSON.stringify(value)
  }
  engine.setItem(key, value)
  return true
}

const getItem = (key) => {
  const value = engine.getItem(key)
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

const removeItem = (key) => {
  engine.removeItem(key)
  return true
}

export { setItem, getItem, removeItem }

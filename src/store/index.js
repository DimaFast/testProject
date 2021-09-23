import { createStore, combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { filmReducer } from './filmReduser'

const rootReduser = combineReducers({
  user: userReducer,
  films: filmReducer,
})
export let store = createStore(rootReduser)

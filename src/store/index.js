import { createStore, combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { filmReducer } from './filmReduser'

const rootReducer = combineReducers({
  user: userReducer,
  films: filmReducer,
})
export let store = createStore(rootReducer)

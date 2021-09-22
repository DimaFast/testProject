// import { createStore as createReduxStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
//
// import createUserReducer from './reducer/user'
//
// export const createStore = ({ user }) => {
//   const reducers = {
//     user: createUserReducer(user),
//   }
//
//   const rootReducer = combineReducers(reducers)
//   const middlewareEnhancer = applyMiddleware(thunk)
//   return createReduxStore(rootReducer, middlewareEnhancer)
// }
//
// export default createStore

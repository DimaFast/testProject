const defaultState = {
  data: null,
}

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        ...state,
        data: action.payload,
      }
    case 'DELETE_USER':
      return { ...state, data: action.payload }
    default:
      return state
  }
}

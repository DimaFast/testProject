const defaultState = {
  data: null,
}

export const filmReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_FILMS':
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    case 'DELETE_FILMS':
      return { ...state, data: action.payload }
    default:
      return state
  }
}

const defaultState = {
  data: [],
}

export const filmReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_FILMS':
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    case 'GET_FILMS':
      return { ...state, data: [...action.payload] }
    default:
      return state
  }
}

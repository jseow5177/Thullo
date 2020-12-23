import { SET_CURRENT_USER } from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        // isAuthenticated: user !== null,
        user: action.payload
      }
    default: {
      return state
    }
  }
}

export default reducers
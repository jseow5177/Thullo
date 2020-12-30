import { SET_CURRENT_USER, SET_AUTHENTICATING, CLEAR_AUTHENTICATING, SET_ERROR, CLEAR_ERROR } from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case SET_AUTHENTICATING:
      return {
        ...state,
        authenticating: true
      }
    case CLEAR_AUTHENTICATING:
      return {
        ...state,
        authenticating: false
      }
    case SET_ERROR:
      return {
        ...state,
        error: {
          errorCode: action.payload.errorCode,
          message: action.payload.message
        }
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default: {
      return state
    }
  }
}

export default reducers
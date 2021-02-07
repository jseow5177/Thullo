import {
  ADD_LIST,
  SET_BOARD_ERROR
} from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
    case SET_BOARD_ERROR:
      return {
        ...state,
        error: {
          errorCode: action.payload.errorCode,
          message: action.payload.message
        }
      }
    default:
      return state
  }
}

export default reducers
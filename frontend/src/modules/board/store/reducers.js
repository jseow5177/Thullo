import {
  ADD_LIST,
  SET_ADD_LIST_LOADING,
  CLEAR_ADD_LIST_LOADING,
  SET_BOARD_ERROR,
  CLEAR_BOARD_ERROR
} from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
    case SET_ADD_LIST_LOADING:
      return {
        ...state,
        addListLoading: true
      }
    case CLEAR_ADD_LIST_LOADING:
      return {
        ...state,
        addListLoading: false
      }
    case SET_BOARD_ERROR:
      return {
        ...state,
        error: {
          errorCode: action.payload.errorCode,
          message: action.payload.message
        }
      }
    case CLEAR_BOARD_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export default reducers
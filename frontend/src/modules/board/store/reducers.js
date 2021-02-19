import {
  ADD_LIST,
  SET_LISTS,
  SET_LABELS,
  SET_LAST_ACTIVE_BOARD,
  SET_ADD_LIST_LOADING,
  CLEAR_ADD_LIST_LOADING,
  SET_BOARD_ERROR,
  CLEAR_BOARD_ERROR,
  SET_RETRIEVE_BOARD_LOADING,
  CLEAR_RETRIEVE_BOARD_LOADING
} from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
    case SET_LISTS:
      return {
        ...state,
        lists: action.payload
      }
    case SET_LABELS:
      return {
        ...state,
        labels: action.payload
      }
    case SET_LAST_ACTIVE_BOARD:
      return {
        ...state,
        lastActiveBoardId: action.payload
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
    case SET_RETRIEVE_BOARD_LOADING:
      return {
        ...state,
        retrieveBoardLoading: true
      }
    case CLEAR_RETRIEVE_BOARD_LOADING:
      return {
        ...state,
        retrieveBoardLoading: false
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
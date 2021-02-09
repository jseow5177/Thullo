import {
  ADD_LIST,
  SET_LISTS,
  SET_LAST_ACTIVE_BOARD,
  SET_ADD_LIST_LOADING,
  CLEAR_ADD_LIST_LOADING,
  SET_GET_LISTS_LOADING,
  CLEAR_GET_LISTS_LOADING,
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
    case SET_LISTS:
      return {
        ...state,
        lists: action.payload
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
    case SET_GET_LISTS_LOADING:
      return {
        ...state,
        getListsLoading: true
      }
    case CLEAR_GET_LISTS_LOADING:
      return {
        ...state,
        getListsLoading: false
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
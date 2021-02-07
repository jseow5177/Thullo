import {
  ADD_BOARD,
  SET_BOARDS,
  SET_ADD_BOARD_LOADING,
  CLEAR_ADD_BOARD_LOADING,
  SET_GET_BOARDS_LOADING,
  CLEAR_GET_BOARDS_LOADING,
  SET_HOME_ERROR,
  CLEAR_HOME_ERROR
} from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    case SET_BOARDS:
      return {
        ...state,
        boards: action.payload
      }
    case SET_ADD_BOARD_LOADING:
      return {
        ...state,
        addBoardLoading: true
      }
    case CLEAR_ADD_BOARD_LOADING:
      return {
        ...state,
        addBoardLoading: false
      }
    case SET_GET_BOARDS_LOADING:
      return {
        ...state,
        getBoardsLoading: true
      }
    case CLEAR_GET_BOARDS_LOADING:
      return {
        ...state,
        getBoardsLoading: false
      }
    case SET_HOME_ERROR:
      return {
        ...state,
        error: {
          errorCode: action.payload.errorCode,
          message: action.payload.message
        }
      }
    case CLEAR_HOME_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export default reducers
import {
  ADD_BOARDS,
  ORDER_BOARDS,
  SET_ADD_BOARD_LOADING,
  CLEAR_ADD_BOARD_LOADING,
  SET_GET_BOARDS_LOADING,
  CLEAR_GET_BOARDS_LOADING
} from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARDS:
      return {
        ...state,
        boards: [...state.boards, ...action.payload]
      }
    case ORDER_BOARDS:
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
    default:
      return state
  }
}

export default reducers
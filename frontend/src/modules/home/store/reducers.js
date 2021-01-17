import {
  ADD_BOARDS,
  SET_ADD_BOARD_LOADING,
  CLEAR_ADD_BOARD_LOADING
} from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARDS:
      return {
        ...state,
        boards: [...state.boards, action.payload]
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
    default:
      return state
  }
}

export default reducers
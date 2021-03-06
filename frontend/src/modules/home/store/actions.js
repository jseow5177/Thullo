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
import HomeService from '../services/home.service'

/**
 * Create a new board
 * 
 * @param {Object} boardInfo The board data to be submitted
 */
export const addBoard = (boardInfo) => async (dispatch) => {

  dispatch({ type: CLEAR_HOME_ERROR })
  dispatch({ type: SET_ADD_BOARD_LOADING })

  try {
    const res = await HomeService.addBoard(boardInfo)

    dispatch({ type: ADD_BOARD, payload: res.data })

    return true
  } catch (error) {
    dispatch({
      type: SET_HOME_ERROR,
      payload: error
    })
    return false
  } finally {
    dispatch({ type: CLEAR_ADD_BOARD_LOADING })
  }

}

/**
 * Get all boards
 */
export const retrieveBoards = () => async (dispatch) => {

  dispatch({ type: CLEAR_HOME_ERROR })
  dispatch({ type: SET_GET_BOARDS_LOADING })

  try {
    const res = await HomeService.retrieveBoards()

    dispatch({ type: SET_BOARDS, payload: res.data })

    return true
  } catch (error) {
    dispatch({
      type: SET_HOME_ERROR,
      payload: error
    })
    return false
  } finally {
    dispatch({ type: CLEAR_GET_BOARDS_LOADING })
  }

}

/**
 * Set boards in an order
 * 
 * @param {Array} boards The boards to be saved into store
 */
export const reorderBoards = (boards) => {
  return { type: SET_BOARDS, payload: boards }
}

/**
 * Switch the order of boards
 * 
 * Loading not required. Doesn't matter if failed to update backend as well
 */
export const switchOrder = (boardIndex) => async (_) => {
  try {
    await HomeService.switchOrder(boardIndex)

    return true
  } catch (error) {
    // No need to display error
    return false
  }
}
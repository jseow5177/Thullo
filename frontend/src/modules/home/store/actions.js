import {
  ADD_BOARDS,
  ORDER_BOARDS,
  SET_ADD_BOARD_LOADING,
  CLEAR_ADD_BOARD_LOADING,
  SET_GET_BOARDS_LOADING,
  CLEAR_GET_BOARDS_LOADING,
  SET_ERROR
} from './types'
import HomeService from '../services/home.service'

/**
 * Create a new board
 * 
 * @param {Object} boardInfo The board data to be submitted
 */
export const addBoard = (boardInfo) => async (dispatch) => {

  dispatch({ type: SET_ADD_BOARD_LOADING })

  try {
    const res = await HomeService.addBoard(boardInfo)

    dispatch({ type: ADD_BOARDS, payload: [res.data] })

    return true
  } catch (error) {
    dispatch({
      type: SET_ERROR,
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

  dispatch({ type: SET_GET_BOARDS_LOADING })

  try {
    const res = await HomeService.retrieveBoards()

    // Sort board by orders
    res.data.sort((x, y) => (x.order > y.order) ? 1 : -1)

    dispatch({ type: ADD_BOARDS, payload: res.data })

    return true
  } catch (error) {
    dispatch({
      type: SET_ERROR,
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
export const setBoards = (boards) => {
  return { type: ORDER_BOARDS, payload: boards }
}

/**
 * Switch the order of boards
 * 
 * Loading not required. Doesn't matter if failed to update backend as well
 */
export const switchOrder = (boardIndex) => async (_) => {
  try {
    await HomeService.switchOrder(boardIndex)
  } catch (error) {
    // No need to display error
    return false
  }
}
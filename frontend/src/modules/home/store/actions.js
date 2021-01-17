import {
  ADD_BOARDS,
  SET_ADD_BOARD_LOADING,
  CLEAR_ADD_BOARD_LOADING
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

    dispatch({ type: ADD_BOARDS, payload: res.data })

    return true
  } catch (error) {
    // TODO: Error handling
    return false
  } finally {
    dispatch({ type: CLEAR_ADD_BOARD_LOADING })
  }

}

export const retrieveBoards = () => async (dispatch) => {

  try {
    const res = await HomeService.retrieveBoards()

    dispatch({ type: ADD_BOARDS, payload: res.data })

    return true
  } catch (error) {
    // TODO: Error handling
    return false
  }

}
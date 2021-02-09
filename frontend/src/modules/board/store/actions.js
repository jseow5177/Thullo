import {
  ADD_LIST,
  SET_LISTS,
  SET_LAST_ACTIVE_BOARD,
  SET_ADD_LIST_LOADING,
  CLEAR_ADD_LIST_LOADING,
  SET_GET_LISTS_LOADING,
  CLEAR_GET_LISTS_LOADING,
  SET_BOARD_ERROR,
  CLEAR_BOARD_ERROR,
} from './types'
import BoardService from '../services/board.service'

/**
 * Retrive the lists of a board
 * 
 * @param {String} boardId The id of viewed board
 */
export const getLists = (boardId) => async (dispatch, getState) => {

  const lastViewedBoard = getState().board.lastActiveBoardId

  dispatch({ type: SET_GET_LISTS_LOADING })

  try {
    // Only retrieve when the viewed board changes
    if (lastViewedBoard !== boardId) {
      const res = await BoardService.getLists(boardId)

      dispatch({ type: SET_LISTS, payload: res.data })
      dispatch({ type: SET_LAST_ACTIVE_BOARD, payload: boardId })
    }

    return true
  } catch (error) {
    dispatch({
      type: SET_BOARD_ERROR,
      payload: error
    })
    return false
  } finally {
    dispatch({ type: CLEAR_GET_LISTS_LOADING })
  }

}

/**
 * Add a new list to the board
 * 
 * @param {Object} listInfo The list to be created. Has two fields: listTitle and boardId
 */
export const addList = (listInfo) => async (dispatch) => {

  dispatch({ type: CLEAR_BOARD_ERROR })
  dispatch({ type: SET_ADD_LIST_LOADING })

  try {
    const res = await BoardService.addList(listInfo)

    dispatch({ type: ADD_LIST, payload: res.data })

    return true
  } catch (error) {
    dispatch({
      type: SET_BOARD_ERROR,
      payload: error
    })
    return false
  } finally {
    dispatch({ type: CLEAR_ADD_LIST_LOADING })
  }

}

/**
 * Set lists in an order
 * 
 * @param {Array} lists An array of lists of a board
 */
export const setLists = (lists) => {
  return { type: SET_LISTS, payload: lists }
}
import {
  ADD_LIST,
  SET_LISTS,
  ADD_LABEL,
  SET_LABELS,
  SET_LAST_ACTIVE_BOARD,
  SET_ADD_LIST_LOADING,
  CLEAR_ADD_LIST_LOADING,
  SET_BOARD_ERROR,
  CLEAR_BOARD_ERROR,
  SET_RETRIEVE_BOARD_LOADING,
  CLEAR_RETRIEVE_BOARD_LOADING,
} from './types'
import BoardService from '../services/board.service'

/**
 * Retrieve the lists, cards and labels of a board
 * 
 * @param {String} boardId The id of viewed board
 */
export const retrieveBoard = (boardId) => async (dispatch, getState) => {

  const lastViewedBoard = getState().board.lastActiveBoardId

  dispatch({ type: SET_RETRIEVE_BOARD_LOADING })

  try {
    // Only retrieve when the different from the last viewed board
    if (lastViewedBoard !== boardId) {
      const res = await BoardService.retrieveBoard(boardId)

      dispatch({ type: SET_LISTS, payload: res.data.lists })
      dispatch({ type: SET_LABELS, payload: res.data.labels })

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
    dispatch({ type: CLEAR_RETRIEVE_BOARD_LOADING })
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
 * Add a new label to the board
 *
 * @param {Object} labelInfo The label to be created. Has three fields: title, color and board
 */
export const addLabel = (labelInfo) => async (dispatch) => {

  dispatch({ type: CLEAR_BOARD_ERROR })

  try {
    const res = await BoardService.addLabel(labelInfo)

    dispatch({ type: ADD_LABEL, payload: res.data })

    return res.data
  } catch (error) {
    dispatch({
      type: SET_BOARD_ERROR,
      payload: error
    })
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
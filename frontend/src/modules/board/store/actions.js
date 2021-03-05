import {
  ADD_LIST,
  SET_LISTS,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
  SET_LABELS,
  ADD_CARD,
  SET_CARDS,
  REORDER_CARDS,
  SET_COLLABORATORS,
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
 * Retrieves all info about a board (including lists, cards and labels)
 *
 * @param {String} boardId The id of a board
 */
export const retrieveBoard = (boardId) => async (dispatch, getState) => {

  const lastViewedBoard = getState().board.lastActiveBoardId

  dispatch({ type: SET_RETRIEVE_BOARD_LOADING })

  try {
    // Only retrieve when the different from the last viewed board
    if (lastViewedBoard !== boardId) {
      const res = await BoardService.retrieveBoard(boardId)

      // Save lists of board
      dispatch({ type: SET_LISTS, payload: res.data.lists })
      // Save labels of board
      dispatch({ type: SET_LABELS, payload: res.data.labels })
      // Save cards of board for each list
      dispatch({ type: SET_CARDS, payload: res.data.cards })
      // TODO: Add support for collaborators
      dispatch({ type: SET_COLLABORATORS, payload: [{ username: 'Connie', id: 1 }, { username: 'Jon', id: 2 }] })

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
 * Add a new list to a board
 *
 * @param {Object} listInfo The info of a list to be created
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
 * Add a new card to a board
 *
 * @param {Object} cardInfo The info of a card to be created
 */
export const addCard = (cardInfo) => async (dispatch) => {

  dispatch({ type: CLEAR_BOARD_ERROR })

  try {
    const res = await BoardService.addCard(cardInfo)

    dispatch({ type: ADD_CARD, payload: res.data })

    return true
  } catch (error) {
    dispatch({
      type: SET_BOARD_ERROR,
      payload: error
    })
    return false
  }
}

/**
 * Add a new label to a board
 *
 * @param {Object} labelInfo The info of a label to be created
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
    return false
  }
}

/**
 * Update an existing label of a board
 *
 * @param {Object} labelInfo The info of a label to be updated
 */
export const updateLabel = (labelInfo) => async (dispatch) => {

  dispatch({ type: CLEAR_BOARD_ERROR })

  try {
    const res = await BoardService.updateLabel(labelInfo)

    dispatch({ type: UPDATE_LABEL, payload: res.data })

    return true
  } catch (error) {
    dispatch({
      type: SET_BOARD_ERROR,
      payload: error
    })
    return false
  }
}

/**
 * Delete an existing label of a board
 *
 * @param {String} labelId
 */
export const deleteLabel = (labelId) => async (dispatch) => {

  dispatch({ type: CLEAR_BOARD_ERROR })

  try {
    await BoardService.deleteLabel(labelId)

    dispatch({ type: DELETE_LABEL, payload: labelId })

    return true
  } catch (error) {
    dispatch({
      type: SET_BOARD_ERROR,
      payload: error
    })
    return false
  }
}

/**
 * Switch the order of a list
 *
 * @param {Object} listInfo The info about a list's order switching. Contains id (list id), source index
 * and destination index
 */
export const switchListOrder = (listInfo) => async (dispatch) => {
  try {
    await BoardService.switchListOrder(listInfo)

    return true
  } catch (error) {
    dispatch({
      type: SET_BOARD_ERROR,
      payload: error
    })
    return false
  }
}

/**
 * Set lists in an order
 * 
 * @param {Array} lists An array of lists of a board
 */
export const reorderLists = (lists) => {
  return { type: SET_LISTS, payload: lists }
}

/**
 * Switch the order of a card. Could happen between lists
 * @param {Object} cardInfo The info about a card's order switching. Contains id (card id), source
 * (has listId and source index) and destination (has listId and destination index)
*/
export const switchCardOrder = (cardInfo) => async (dispatch) => {
  try {
    await BoardService.switchCardOrder(cardInfo)

    return true
  } catch (error) {
    dispatch({
      type: SET_BOARD_ERROR,
      payload: error
    })
    return false
  }
}

/**
 * Set cards in an order
 *
 * @param {Array} cards An array of cards in a list
 */
export const reorderCards = (destination, source) => {
  return { type: REORDER_CARDS, payload: { destination, source } }
}
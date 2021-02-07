import {
  ADD_LIST,
  SET_LISTS,
  SET_ADD_LIST_LOADING,
  CLEAR_ADD_LIST_LOADING,
  SET_GET_LISTS_LOADING,
  CLEAR_GET_LISTS_LOADING,
  SET_BOARD_ERROR,
  CLEAR_BOARD_ERROR,
} from './types'
import BoardService from '../services/board.service'

export const getLists = (boardId) => async (dispatch) => {

  dispatch({ type: SET_GET_LISTS_LOADING })

  try {
    const res = await BoardService.getLists(boardId)

    dispatch({ type: SET_LISTS, payload: res.data })

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
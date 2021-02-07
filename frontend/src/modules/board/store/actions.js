import {
  ADD_LIST,
  SET_ADD_LIST_LOADING,
  CLEAR_ADD_LIST_LOADING,
  SET_BOARD_ERROR,
  CLEAR_BOARD_ERROR
} from './types'
import BoardService from '../services/board.service'

export const getLists = () => async (dispatch) => {

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
import {
  ADD_LIST,
  SET_BOARD_ERROR
} from './types'
import BoardService from '../services/board.service'

export const addList = (listInfo) => async (dispatch) => {

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
  }

}
import {
  ADD_LIST,
  SET_ERROR
} from './types'
import BoardService from '../services/board.service'

export const addList = () => async (dispatch) => {

  try {
    const list = await BoardService.addList()

    dispatch({ type: ADD_LIST, payload: list })
    return true
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error
    })
    return false
  }

}
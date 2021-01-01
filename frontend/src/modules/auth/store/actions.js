import {
  SET_CURRENT_USER,
  SET_AUTHENTICATING,
  CLEAR_AUTHENTICATING,
  SET_ERROR,
  CLEAR_ERROR
} from './types'

import AuthService from '../services/auth.service'

export const login = (email, password) => async (dispatch) => {

  dispatch({ type: SET_AUTHENTICATING })
  dispatch({ type: CLEAR_ERROR })

  try {
    const token = await AuthService.login(email, password)
    dispatch({
      type: SET_CURRENT_USER,
      payload: token
    })

    return true
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: {
        errorCode: error.errorCode,
        message: error.message
      }
    })

    return false
  } finally {
    dispatch({ type: CLEAR_AUTHENTICATING })
  }

}

export const signup = (email, username, password) => async (dispatch) => {

  dispatch({ type: SET_AUTHENTICATING })
  dispatch({ type: CLEAR_ERROR })

  try {
    await AuthService.signup(email, username, password)

    return true
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: {
        errorCode: error.errorCode,
        message: error.message
      }
    })

    return false
  } finally {
    dispatch({ type: CLEAR_AUTHENTICATING })
  }

}

export const clearError = () => ({
  type: CLEAR_ERROR
})
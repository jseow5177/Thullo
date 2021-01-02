import {
  SET_AUTHENTICATED,
  SET_AUTHENTICATING,
  CLEAR_AUTHENTICATING,
  SET_ERROR,
  CLEAR_ERROR,
  CLEAR_AUTHENTICATED
} from './types'
import history from '../../../history'
import AuthService from '../services/auth.service'

export const login = (email, password) => async (dispatch) => {

  dispatch({ type: SET_AUTHENTICATING })
  dispatch({ type: CLEAR_ERROR })

  try {
    await AuthService.login(email, password)
    dispatch({ type: SET_AUTHENTICATED })

    // Go to home page
    history.push('/home')

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

    // Go to login page
    history.push('/login')

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

export const logout = () => (dispatch) => {

  AuthService.logout()
  dispatch({ type: CLEAR_AUTHENTICATED })

  // Go to login page
  history.push('/login')
}

export const refreshToken = () => async (dispatch) => {

  dispatch({ type: SET_AUTHENTICATING })
  dispatch({ type: CLEAR_ERROR })

  try {
    await AuthService.refreshToken()
    dispatch({ type: SET_AUTHENTICATED })

    return true
  } catch (error) {
    // No need to set and display error. Just throw
    throw error
  } finally {
    dispatch({ type: CLEAR_AUTHENTICATING })
  }

}

export const clearError = () => ({
  type: CLEAR_ERROR
})
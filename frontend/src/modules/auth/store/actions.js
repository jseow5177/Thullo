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

/**
 * Log in user.
 * Redirects user to home page if log in successful.
 * 
 * @param {String} email Email in valid format provided by user
 * @param {String} password Password provided by user
 */
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

/**
 * Sign up user.
 * Redirects user to log in page if sign up is successful.
 * 
 * @param {String} email Email in valid format provided by user.
 * @param {String} username Valid username provided by user.
 * @param {String} password Valid password with acceptable strength provided by user.
 */
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

/**
 * Log user out from the application.
 */
export const logout = () => (dispatch) => {

  AuthService.logout()
  dispatch({ type: CLEAR_AUTHENTICATED })

  // Go to login page
  history.push('/login')

  return true
}

/**
 * Request for new access token via the refresh token.
 */
export const refreshToken = () => async (dispatch) => {

  dispatch({ type: SET_AUTHENTICATING })
  dispatch({ type: CLEAR_ERROR })

  try {
    await AuthService.refreshToken()
    dispatch({ type: SET_AUTHENTICATED })

    return true
  } catch (error) {
    // No need to set and display error. Just throw.
    throw error
  } finally {
    dispatch({ type: CLEAR_AUTHENTICATING })
  }

}

/**
 * Clear all errors in auth redux store.
 */
export const clearError = () => ({
  type: CLEAR_ERROR
})
import ApiService from '../../../common/services/api.service'
import TokenService from '../../../common/services/token.service'
import ThulloErrorHandler from '../../../common/errorHandler'

class AuthenticationError extends ThulloErrorHandler {
  constructor(errorResponse) {
    super(errorResponse)
    this.resource = 'user'
    this.name = this.constructor.name
  }
}

const AuthService = {
  /**
   * Login the user then stores the access and refresh token
   * 
   * @returns access_token, refresh_token
   * @throws AuthenticationError
   */
  login: async function (email, password) {

    try {
      const response = await ApiService.post('/auth/login/', {
        email: email,
        password: password
      })

      // Save access token to localStorage
      TokenService.saveAccessToken(response.data.access)
      // Save refresh token to localStorage
      TokenService.saveRefreshToken(response.data.refresh)

      return response.data.access
    } catch (error) {
      throw new AuthenticationError(error.response)
    }

  },

  signup: async function (email, username, password) {

    try {
      await ApiService.post('/auth/signup/', {
        email: email,
        username: username,
        password: password
      })

      return true
    } catch (error) {
      throw new AuthenticationError(error.response)
    }

  }

}

export default AuthService
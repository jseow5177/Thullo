import ApiService from '../../../common/services/api.service'
import TokenService from '../../../common/services/token.service'
import ThulloError from '../../../common/error-handler'

class AuthenticationError extends ThulloError {
  constructor(statusCode, errorData) {
    super(statusCode, errorData)
    this.message = this.serializeError()
  }

  serializeError() {
    return super.serializeError()
  }
}

const AuthService = {

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
      // Mount 401 Interceptor
      ApiService.mount401Interceptor()
      // Set auth header
      ApiService.setAuthHeader()

      return response.data.access
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data)
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
      throw new AuthenticationError(error.response.status, error.response.data)
    }

  },

  refreshToken: async function () {
    const refreshToken = TokenService.getRefreshToken()

    try {
      const response = await ApiService.post('/auth/refresh/', {
        refresh: refreshToken
      })

      // Save new access token
      TokenService.saveAccessToken(response.data.access)

      // Update the authentication header
      ApiService.setAuthHeader()

      return response.data.access
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data)
    }
  },

  logout: function () {
    // Remove access token from localStorage
    TokenService.removeAccessToken()
    // Remove refresh token from localStorage
    TokenService.removeRefreshToken()
    // Unmount 401 interceptor
    ApiService.unmount401Interceptor()
    // Remove authentication header
    ApiService.removeHeader()
  },



}

export default AuthService
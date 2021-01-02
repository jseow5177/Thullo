import axios from 'axios'

import TokenService from './token.service'
import store from '../../store'
import { refreshToken, logout } from '../../modules/auth/store/actions'


const ApiService = {

  // Stores the 401 interceptor position so that it can later be ejected
  _401interceptor: null,

  setAuthHeader() {
    /**
     * Set default header which will be sent with every request
     */
    axios.defaults.headers.common.Authorization = `Bearer ${TokenService.getAccessToken()}`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource, params = null) {
    return axios.get(resource, { params })
  },

  post(resource, data) {
    return axios.post(resource, data)
  },

  put(resource, data) {
    return axios.put(resource, data)
  },

  delete(resource) {
    return axios.delete(resource)
  },

  mount401Interceptor: function mount401Interceptor() {
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response
    }, async function (error) {
      /**
       * Any status code that falls outside the range of 2xx cause this function to trigger
       * 
       * Intercepts and handle 401 token errors
       * 1. If server responds with a 401 error, attempt to get new access token and resend original request
       * 2. If token refresh fails, proceed to logout
       */

      if (error.response && error.response.status === 401) {
        // If access token is invalid / expired
        if (error.response.data.code === 'token_not_valid' && !error.config.url.includes('/auth/refresh')) {
          try {
            // Attempt to get new access token via refresh token
            await store.dispatch(refreshToken())

            const { method, url, data, params, responseType } = error.response.config

            const config = {
              method: method, // HTTP method
              url: url // Request url
            }

            // Check if there are any post data
            if (typeof data !== 'undefined') {
              try {
                config.data = JSON.parse(data)
              } catch {
                config.data = data
              }
            }

            // Check if there are any url params
            if (typeof params !== 'undefined') {
              config.params = params
            }

            // Check if there is a specified response type
            if (typeof responseType !== 'undefined') {
              config.responseType = responseType
            }

            // Attempt to resend the original request
            return axios(config)
          } catch {
            // Refresh token fails
            store.dispatch(logout())
            return Promise.reject(error)
          }
        }
      }

      // Return any other error
      return Promise.reject(error)
    })
  },

  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor)
    this._401interceptor = null
  }

}

export default ApiService
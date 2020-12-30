import { CRUD } from './constants'
import { capitalize } from './utils'

class ThulloErrorHandler extends Error {
  constructor(errorResponse) {
    /**
     * @param {Object} errorResponse - The error response generated from Django backend
     */
    super()
    this.name = this.constructor.name
    this.resource = 'resource'
    this.errorResponse = errorResponse
    // HTTP error code
    this.errorCode = errorResponse.status
    // HTTP method
    this.method = errorResponse.config.method
    // Raw error message data
    this.errorData = errorResponse.data
    // Processed error message data
    this.message = this.generateErrorMessage()
  }

  generateErrorMessage() {
    let message

    switch (this.errorCode) {
      case 400:
        message = this.handle400(this.resource, this.method, this.errorData)
        break
      case 401:
        message = this.handle401(this.resource, this.method, this.errorData)
        break
      case 403:
        message = this.handle403(this.resource, this.method)
        break
      case 404:
        message = this.handle404(this.resource, this.method)
        break
      default:
        message = this.handleOthers()
        break
    }

    return message
  }

  handle400() {
    // Temporary
    console.log(this.errorData)
  }

  handle401() {
    let message

    switch (this.method) {
      case 'get':
      case 'put':
      case 'post':
      case 'delete':
        message = this.errorData.detail
        break
      default:
        break
    }

    return message
  }

  handle404() {
    let message

    switch (this.method) {
      case 'get':
      case 'put':
      case 'post':
      case 'delete':
        message = `${capitalize(this.resource)} not found!`
        break
      default:
        message = ''
        break
    }

    return message
  }

  handle403() {
    let message

    switch (this.method) {
      case 'get':
      case 'put':
      case 'post':
      case 'delete':
        message = `You do not have permission to ${CRUD[this.method]} this ${this.resource}.`
        break
      default:
        message = ''
        break
    }

    return message
  }

  handleOthers() {
    // Perhaps something more meaningful?
    return 'Something went horribly wrong! Please try again later.'
  }

}

export default ThulloErrorHandler
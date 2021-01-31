class ThulloError extends Error {

  constructor(statusCode, errorData) {
    super()
    this.statusCode = statusCode
    this.errorData = errorData
  }

  serializeError() {
    switch (this.statusCode.toString()[0]) { // Check the first digit of status code
      case '5': // 5xx error codes
        return 'Server error!'
      default:
        return this.errorData[0].message // Prioritize first error message
    }
  }

}

export default ThulloError
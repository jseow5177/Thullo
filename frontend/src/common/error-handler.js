class ThulloError extends Error {

  constructor(errorCode, errorData) {
    super()
    this.errorCode = errorCode
    this.errorData = errorData
  }

  serializeError() {
    switch (this.errorCode.toString()[0]) { // Check the first digit of status code
      case '5': // 5xx error codes
        return 'Server error!'
      default:
        return this.errorData[0].message // Prioritize first error message
    }
  }

}

export default ThulloError
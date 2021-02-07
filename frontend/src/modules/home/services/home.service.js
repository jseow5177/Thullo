import ThulloError from '../../../common/error-handler'
import ApiService from '../../../common/services/api.service'

class HomeError extends ThulloError {
  constructor(errorCode, errorData) {
    super(errorCode, errorData)
    this.message = this.serializeError()
  }

  serializeError() {
    return super.serializeError()
  }
}

const HomeService = {

  addBoard: async (boardInfo) => {
    try {
      const response = await ApiService.post('/board/', boardInfo)

      return response
    } catch (error) {
      throw new HomeError(error.response.status, error.response.data)
    }
  },

  retrieveBoards: async () => {
    try {
      const response = await ApiService.get('/board/')

      return response
    } catch (error) {
      throw new HomeError(error.response.status, error.response.data)
    }
  },

  switchOrder: async (boardIndex) => {
    try {
      const response = await ApiService.put('/board/switch_order/', boardIndex)

      return response
    } catch (error) {
      console.error(error)
      throw new HomeError(error.response.status, error.response.data)
    }
  }

}

export default HomeService
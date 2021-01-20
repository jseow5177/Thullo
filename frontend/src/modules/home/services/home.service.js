import ThulloErrorHandler from '../../../common/errorHandler'
import ApiService from '../../../common/services/api.service'

class HomeError extends ThulloErrorHandler {
  constructor(errorResponse) {
    super(errorResponse)
    this.resource = 'home'
    this.name = this.constructor.name
  }
}

const HomeService = {

  addBoard: async (boardInfo) => {
    try {
      const response = await ApiService.post('/board/', boardInfo)

      return response
    } catch (error) {
      throw new HomeError(error.response)
    }
  },

  retrieveBoards: async () => {
    try {
      const response = await ApiService.get('/board/')

      return response
    } catch (error) {
      throw new HomeError(error.response)
    }
  }

}

export default HomeService
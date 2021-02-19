import ThulloError from '../../../common/error-handler'
import ApiService from '../../../common/services/api.service'

class BoardError extends ThulloError {
  constructor(errorCode, errorData) {
    super(errorCode, errorData)
    this.message = this.serializeError()
  }

  serializeError() {
    return super.serializeError()
  }
}

const BoardService = {

  retrieveBoard: async (boardId) => {
    try {
      const response = await ApiService.get(`/board/${boardId}/`)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  addList: async (listInfo) => {
    try {
      const response = await ApiService.post('/list/', listInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  addLabel: async (labelInfo) => {
    try {
      const response = await ApiService.post('/label/', labelInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  }

}

export default BoardService
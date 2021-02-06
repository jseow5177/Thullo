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

  addList: async () => {
    try {
      await ApiService.post('/board/create_list')
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  }

}

export default BoardService
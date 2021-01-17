import ApiService from '../../../common/services/api.service'

const HomeService = {

  addBoard: async (boardInfo) => {
    try {
      const response = await ApiService.post('/board/', boardInfo)

      return response
    } catch (error) {
      // TODO: Error handling
    }
  },

  retrieveBoards: async () => {
    try {
      const response = await ApiService.get('/board/')

      return response
    } catch (eror) {
      // TODO: Error handling
    }
  }

}

export default HomeService
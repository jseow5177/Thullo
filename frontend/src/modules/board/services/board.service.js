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

  /**
   * Retrieves all info about a board (including lists, cards and labels)
   * 
   * @param {String} boardId The id of a board
   */
  retrieveBoard: async (boardId) => {
    try {
      const response = await ApiService.get(`/board/${boardId}/`)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  /**
   * Add a new list to a board
   * 
   * @param {Object} listInfo The info of a list to be created
   */
  addList: async (listInfo) => {
    try {
      const response = await ApiService.post('/list/', listInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  /**
   * Update an existing list of a board
   * 
   * @param {Object} listInfo 
   */
  updateList: async (listInfo) => {
    try {
      const response = await ApiService.put(`/list/${listInfo.id}/`, listInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  /**
   * Delete an existing list of a board
   * 
   * @param {String} listId 
   */
  deleteList: async (listId) => {
    try {
      const response = await ApiService.delete(`/list/${listId}/`)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  /**
   * Add a new card to a board
   * 
   * @param {Object} cardInfo The info of a card to be created
   */
  addCard: async (cardInfo) => {
    try {
      const response = await ApiService.post('/card/', cardInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  /**
   * Add a new label to a board
   * 
   * @param {Object} labelInfo The info of a label to be created
   */
  addLabel: async (labelInfo) => {
    try {
      const response = await ApiService.post('/label/', labelInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  /**
   * Update an existing label of a board
   * 
   * @param {Object} labelInfo The info of a label to be updated
   */
  updateLabel: async (labelInfo) => {
    try {
      const response = await ApiService.put(`/label/${labelInfo.id}/`, labelInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  /**
   * Delete an existing label of a board
   * 
   * @param {String} labelId 
   */
  deleteLabel: async (labelId) => {
    try {
      const response = await ApiService.delete(`/label/${labelId}/`)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },

  /**
   * Switch the order of a list
   * 
   * @param {Object} listInfo The info about a list's order switching. Contains id (list id), source index
   * and destination index
   */
  switchListOrder: async (listInfo) => {
    try {
      const response = await ApiService.put('/list/switch_order/', listInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  },


  /**
   * Switch the order of a card. Could happen between lists
   * 
   * @param {Object} cardInfo The info about a card's order switching. Contains id (card id), source 
   * (has listId and source index) and destination (has listId and destination index)
   */
  switchCardOrder: async (cardInfo) => {
    try {
      const response = await ApiService.put('/card/switch_order/', cardInfo)

      return response
    } catch (error) {
      throw new BoardError(error.response.status, error.response.data)
    }
  }

}

export default BoardService
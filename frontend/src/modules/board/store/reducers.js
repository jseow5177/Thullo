import {
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  SET_LISTS,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
  SET_LABELS,
  ADD_CARD,
  SET_CARDS,
  REORDER_CARDS,
  SET_COLLABORATORS,
  SET_LAST_ACTIVE_BOARD,
  SET_ADD_LIST_LOADING,
  CLEAR_ADD_LIST_LOADING,
  SET_BOARD_ERROR,
  CLEAR_BOARD_ERROR,
  SET_RETRIEVE_BOARD_LOADING,
  CLEAR_RETRIEVE_BOARD_LOADING
} from './types'
import initialState from './state'

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
        cards: { ...state.cards, [action.payload.id]: [] } // New key
      }
    case UPDATE_LIST: {
      const indexOfUpdatedList = state.lists.findIndex(list => list.id === action.payload.id)
      const newListsAfterUpdate = [...state.lists]
      newListsAfterUpdate[indexOfUpdatedList] = action.payload

      return {
        ...state,
        lists: newListsAfterUpdate
      }
    }
    case DELETE_LIST: {
      const newListsAfterDelete = state.lists.filter(list => list.id !== action.payload)

      return {
        ...state,
        lists: [...newListsAfterDelete]
      }
    }
    case SET_LISTS:
      return {
        ...state,
        lists: action.payload
      }
    case ADD_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.payload]
      }
    case UPDATE_LABEL:
      const indexOfUpdatedLabel = state.labels.findIndex(label => label.id === action.payload.id)
      const newLabelsAfterUpdate = [...state.labels]
      newLabelsAfterUpdate[indexOfUpdatedLabel] = action.payload

      return {
        ...state,
        labels: newLabelsAfterUpdate
      }
    case DELETE_LABEL:
      const newLabelsAfterDelete = state.labels.filter(label => label.id !== action.payload)

      return {
        ...state,
        labels: [...newLabelsAfterDelete]
      }
    case SET_LABELS:
      return {
        ...state,
        labels: action.payload
      }
    case ADD_CARD:
      const listId = action.payload.board_list
      const existingCards = state.cards[listId]

      return {
        ...state,
        cards: { ...state.cards, [listId]: [...existingCards, action.payload] }
      }
    case SET_CARDS:
      return {
        ...state,
        cards: action.payload
      }
    case REORDER_CARDS:
      const destination = action.payload.destination
      const source = action.payload.source

      return {
        ...state,
        cards: {
          ...state.cards,
          [destination.listId]: destination.cards,
          [source.listId]: source.cards
        }
      }
    case SET_COLLABORATORS:
      const collaborators = action.payload.map(collaborator => ({
        value: collaborator.id,
        label: collaborator.username
      }))

      return {
        ...state,
        collaborators: collaborators
      }
    case SET_LAST_ACTIVE_BOARD:
      return {
        ...state,
        lastActiveBoardId: action.payload
      }
    case SET_ADD_LIST_LOADING:
      return {
        ...state,
        addListLoading: true
      }
    case CLEAR_ADD_LIST_LOADING:
      return {
        ...state,
        addListLoading: false
      }
    case SET_RETRIEVE_BOARD_LOADING:
      return {
        ...state,
        retrieveBoardLoading: true
      }
    case CLEAR_RETRIEVE_BOARD_LOADING:
      return {
        ...state,
        retrieveBoardLoading: false
      }
    case SET_BOARD_ERROR:
      return {
        ...state,
        error: {
          errorCode: action.payload.errorCode,
          message: action.payload.message
        }
      }
    case CLEAR_BOARD_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export default reducers
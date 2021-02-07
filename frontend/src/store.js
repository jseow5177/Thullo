import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'

import { authReducers, authState } from './modules/auth/store'
import { homeReducers, homeState } from './modules/home/store'
import { boardReducers, boardState } from './modules/board/store'

const rootReducer = combineReducers({
  auth: authReducers,
  home: homeReducers,
  board: boardReducers
})

const initialState = {
  auth: authState,
  home: homeState,
  board: boardState
}

const middleware = [thunk]

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default store


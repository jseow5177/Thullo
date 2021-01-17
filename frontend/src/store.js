import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'

import { authReducers, authState } from './modules/auth/store'
import { homeReducers, homeState } from './modules/home/store'

const rootReducer = combineReducers({
  auth: authReducers,
  home: homeReducers
})

const initialState = {
  auth: authState,
  home: homeState
}

const middleware = [thunk]

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default store


import React from 'react'
import { Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import history from './history'

// Custom Route component
import RouteWrapper from './components/RouteWrapper'

// Layouts
import MainLayout from './components/Layout/MainLayout'
import LandingLayout from './components/Layout/LandingLayout'
import AuthLayout from './components/Layout/AuthLayout/'

// App Views
import Landing from './modules/auth/views/Landing/'
import UserAuth from './modules/auth/views/UserAuth'
import HomePage from './modules/home/views/HomePage'

// Token Service
import TokenService from './common/services/token.service'

// API Service
import ApiService from './common/services/api.service'

// Action types
import { SET_AUTHENTICATED } from './modules/auth/store/types'

function App() {

  if (TokenService.getAccessToken() !== null) {
    // Set token to auth header
    ApiService.setAuthHeader()
    // Set user is authenticated
    store.dispatch({ type: SET_AUTHENTICATED })
    // Mount 401 Interceptor
    ApiService.mount401Interceptor()
  }

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <RouteWrapper exact path="/home" component={HomePage} layout={MainLayout} />
          <RouteWrapper exact path={["/login", "/signup"]} isPrivate={false} component={UserAuth} layout={AuthLayout} />
          <RouteWrapper exact path="/" isPrivate={false} component={Landing} layout={LandingLayout} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

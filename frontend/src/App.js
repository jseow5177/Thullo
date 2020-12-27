import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import RouteWrapper from './components/RouteWrapper'

import MainLayout from './components/Layout/MainLayout'
import LandingLayout from './components/Layout/LandingLayout'
import AuthLayout from './components/Layout/AuthLayout/'

import Landing from './modules/auth/views/Landing/'
import UserAuth from './modules/auth/views/UserAuth'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <RouteWrapper exact path="/home" layout={MainLayout} />
          <RouteWrapper exact path={["/login", "/signup"]} isPrivate={false} component={UserAuth} layout={AuthLayout} />
          <RouteWrapper exact path="/" isPrivate={false} component={Landing} layout={LandingLayout} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

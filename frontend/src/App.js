import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import RouteWrapper from './components/RouteWrapper'

import Layout from './components/Layout/'
import Landing from './modules/auth/views/Landing/'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <RouteWrapper exact path="/" isPrivate={false} component={Landing} layout={Layout} />
          <RouteWrapper exact path="/home" layout={Layout} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './modules/auth/components/PrivateRoute'

import Landing from './modules/auth/views/Landing/'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/home" />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

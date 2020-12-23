import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {

  const renderComponent = props => {
    /**
     * Redirect user to authentication page if not yet logged in
     * Else, go to the Component visited
     */
    if (auth.isAuthenticated) {
      return <Component {...props} />
    } else {
      return <Redirect to="/" />
    }
  }

  return (
    <Route {...rest} render={props => renderComponent(props)} />
  )

}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(PrivateRoute)
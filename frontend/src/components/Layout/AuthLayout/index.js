import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styles from './AuthLayout.module.scss'

import CircularProgress from '@material-ui/core/CircularProgress'

import AuthHeader from '../../Header/AuthHeader'

function AuthLayout({ children, auth }) {

  const [isInitialised, setIsInitialised] = useState(false)
  const [redirectPath, setRedirectPath] = useState(null)

  useEffect(() => {
    /**
     * 1. On component mount, check if user is authenticated,
     * 2. If authenticated, set redirectPath to /home
     * 3. Initialise the component.
     */
    if (auth.isAuthenticated) {
      setRedirectPath('/home')
    }
    setIsInitialised(true)
  }, [auth.isAuthenticated])

  const render = () => {
    /**
     * If app is not initialised, show loading spinner.
     * Else if no redirectPath (user not authenticated), renders log in / sign up page.
     * Else if has redirectPath to /home, redirects user to /home.
     */
    if (!isInitialised) {
      return <CircularProgress size={50} className={styles.spinner} />
    } else {
      if (redirectPath === null) {
        return (
          <>
            <AuthHeader />
            {children}
          </>
        )
      } else {
        return <Redirect to={redirectPath} />
      }
    }
  }

  return (
    <div className={styles.layout}>
      {render()}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AuthLayout)
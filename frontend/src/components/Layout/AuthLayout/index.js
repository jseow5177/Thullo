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
    if (auth.isAuthenticated) {
      setRedirectPath('/home')
    }
    setIsInitialised(true)
  }, [auth.isAuthenticated])

  const render = () => {
    if (isInitialised && redirectPath) {
      return <Redirect to={redirectPath} />
    } else if (isInitialised && redirectPath === null) {
      return (
        <>
          <AuthHeader />
          {children}
        </>
      )
    } else {
      return <CircularProgress size={50} className={styles.spinner} />
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
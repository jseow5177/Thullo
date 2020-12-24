import React from 'react'

import AuthHeader from '../Header/AuthHeader'

function AuthLayout({ children }) {
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  )
}

export default AuthLayout
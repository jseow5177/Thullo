import React from 'react'

import LandingHeader from '../Header/LandingHeader'

function LandingLayout({ children }) {
  return (
    <div>
      <LandingHeader />
      {children}
    </div>
  )
}

export default LandingLayout
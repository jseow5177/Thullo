import React from 'react'

import MainHeader from '../Header/MainHeader'

function MainLayout({ children }) {
  return (
    <div>
      <MainHeader />
      {children}
    </div>
  )
}

export default MainLayout
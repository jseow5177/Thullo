import React from 'react'

import LogoOnly from '../assets/image/logo_only.png'
import TextOnly from '../assets/image/text_only.png'
import LogoAndText from '../assets/image/logo_and_text.png'

function Logo({ size, variant }) {

  const imgSrc = () => {
    switch (variant) {
      case 'logo-only':
        return LogoOnly
      case 'text-only':
        return TextOnly
      case 'text-and-logo':
        return LogoAndText
      default:
        return ''
    }
  }

  return (
    <img src={imgSrc()} alt="logo" style={{ width: `${size}` }} />
  )
}

export default Logo
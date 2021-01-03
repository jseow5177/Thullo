import React from 'react'
import PropTypes from 'prop-types'

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

Logo.defaultProps = {
  size: '50px',
  variant: 'text-and-logo'
}

Logo.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
}

export default Logo
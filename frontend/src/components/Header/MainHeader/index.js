import React, { useState } from 'react'

// Material UI Components
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import Logo from '../../Logo'
import SearchBar from '../../SearchBar'

import styles from './MainHeader.module.scss'

function MainHeader() {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const isMenuOpen = Boolean(menuAnchor)

  const [keyword, setSearchKeyword] = useState('')

  const handleMenuOpen = (e) => {
    setMenuAnchor(e.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar className={styles.toolbar}>
        <div className={styles.leftComponents}>
          <IconButton className={styles.logoBtn} edge="start">
            <Logo size="40px" variant="logo-only" />
            <Logo size="70px" variant="text-only" />
          </IconButton>
          <SearchBar
            keyword={keyword}
            onKeywordChange={setSearchKeyword}
          />
        </div>
        <div>
          <IconButton
            className={styles.logoBtn}
            onClick={handleMenuOpen}>
            <Avatar>JS</Avatar>
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            getContentAnchorEl={null}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default MainHeader
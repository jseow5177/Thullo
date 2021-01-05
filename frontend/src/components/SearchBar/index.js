import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'

import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import styles from './SearchBar.module.scss'

function SearchBar({ keyword, onKeywordChange, search }) {

  const inputRef = useRef(null)
  const [searchBarExpanded, setSearchBarExpanded] = useState(false)

  const handleChange = (e) => {
    onKeywordChange(e.target.value)
  }

  const expandSearchBar = () => {
    if (!searchBarExpanded) {
      inputRef.current.focus()
      setSearchBarExpanded(true)
    }
  }

  const shrinkSearchBar = () => {
    setSearchBarExpanded(false)
    onKeywordChange('')
  }

  const iconToRender = () => {
    if (searchBarExpanded) {
      return <CloseIcon className={styles.closeIcon} onClick={shrinkSearchBar} />
    } else {
      return <SearchIcon className={styles.searchIcon} />
    }
  }

  return (
    <Paper
      elevation={searchBarExpanded ? 8 : 3}
      className={`${searchBarExpanded ? styles.expandedPaper : styles.shrinkPaper}`}
      onClick={expandSearchBar}
    >
      <InputBase
        inputRef={inputRef}
        value={keyword}
        onChange={handleChange}
        onBlur={shrinkSearchBar}
        className={`${searchBarExpanded ? styles.expandedInput : styles.shrinkInput}`}
      />
      {iconToRender()}
    </Paper >
  )
}

SearchBar.propTypes = {
  keyword: PropTypes.string,
  onKeywordChange: PropTypes.func,
  search: PropTypes.func,
}

export default SearchBar


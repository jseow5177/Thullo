import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CustomTooltip from '../../../../components/CustomMaterialUI/CustomTooltip'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import InsertLinkIcon from '@material-ui/icons/InsertLink'

import styles from './TextEditor.module.scss'

/**
 * From MDN on Document.execCommand()
 * 
 * When an HTML document has been switched to designMode, 
 *  its document object exposes an execCommand method to run commands that manipulate the current editable region,
 *  such as form inputs or contentEditable elements.
 * 
 * Most commands affect the document's selection (bold, italics, etc.), 
 *  while others insert new elements (adding a link), or affect an entire line (indenting). 
 *  When using contentEditable, execCommand() affects the currently active editable element.
 * 
 * This feature is no longer recommended. Might be deprecated.
 */

const FormatIcon = ({ title, icon, ...props }) => (
  <CustomTooltip title={title} arrow>
    <div {...props}>
      {icon}
    </div>
  </CustomTooltip>
)

const Toolbar = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)

function TextEditor({ placeholder, value, handleChange }) {

  const handleChangeWithFormatting = (e) => {
    e.preventDefault()
    const htmlContent = e.currentTarget.innerHTML
    handleChange(htmlContent)
  }

  const format = (command) => {
    document.execCommand(command, false, value)
  }

  const paste = (e) => {
    // Cancel default paste behavior
    e.preventDefault()

    // Get text representation of clipboard
    const text = (e.originalEvent || e).clipboardData.getData('text/plain')

    /**
     * Insert text manually as text. No hacks needed to remove HTML formatting.
     * Weird enough, 'insertText' is the command that inserts the text with HTML formatting.
    */
    document.execCommand('insertHTML', false, text)
  }

  return (
    <>
      <Toolbar className={styles.toolbar}>
        <FormatIcon
          title="Bold (Ctrl+B)"
          icon={<FormatBoldIcon />}
          className={styles.formatIcon}
          onClick={_ => format("bold")}
        />
        <FormatIcon
          title="Underline (Ctrl+U)"
          icon={<FormatUnderlinedIcon />}
          className={styles.formatIcon}
          onClick={_ => format('underline')}
        />
        <FormatIcon
          title="Italic (Ctrl+I)"
          icon={<FormatItalicIcon />}
          className={styles.formatIcon}
          onClick={_ => format('italic')}
        />
        <FormatIcon
          title="Link (Ctrl+A)"
          icon={<InsertLinkIcon />}
          className={styles.formatIcon}
        />
      </Toolbar>
      <div
        contentEditable
        className={styles.editor}
        onInput={handleChangeWithFormatting}
        data-placeholder={placeholder}
        onPaste={paste}
      ></div>
      {/* <TextField
        variant="outlined"
        multiline
        rows={rows}
        size="small"
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={handleChangeWithFormatting}
      /> */}
    </>
  )
}

TextEditor.defaultProps = {
  placeholder: '',
  rows: 4
}

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  rows: PropTypes.number
}

export default TextEditor
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import styles from './FormField.module.scss'

function FormField({
  fieldId,
  label,
  type,
  validator,
  placeholder,
  children,
  value,
  onValueChanged,
  startIcon,
  endIcon,
  hideLabel = false,
  required = false,
}) {

  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    // Clear errors
    setErrors([])

    // Update value prop
    onValueChanged(e.target.value)
  }

  const runValidator = () => {
    const isEmpty = value.length === 0
    const requiredMissing = isDirty && required && isEmpty

    if (requiredMissing) {
      // If field is required and is empty, add required error to state
      setErrors([...errors, `${label} is required`])
    } else if (typeof validator === 'function') {
      try {
        validator(value)
      } catch (e) {
        // If validator throws error, add validation error to state
        setErrors([...errors, e.message])
      }
    }
  }

  const inputDirty = () => {
    // Set dirty to true and always remain true
    setIsDirty(true)
  }

  return (
    <div className={styles.input}>
      <p className={styles.errorMsg}>{errors[0]}</p>
      <TextField
        variant="outlined"
        size="small"
        id={fieldId}
        placeholder={placeholder}
        type={type}
        value={value}
        fullWidth={true}
        onFocus={inputDirty}
        onChange={handleChange}
        onBlur={runValidator}
        label={!hideLabel && label}
        error={errors.length > 0}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end">
              {endIcon}
            </InputAdornment>
          )
        }}
      />
      {children}
    </div>
  )
}

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hideLabel: PropTypes.bool,
  required: PropTypes.bool,
  children: PropTypes.node,
  validator: PropTypes.func,
  onValueChanged: PropTypes.func,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node
}

export default FormField
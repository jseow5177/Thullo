import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import styles from './FormField.module.scss'

const FormField = forwardRef(({
  fieldId,
  label,
  type,
  validator,
  placeholder,
  children,
  value,
  onValueChanged,
  errors,
  setErrors,
  startIcon,
  endIcon,
  hideLabel = false,
  required = false,
}, ref) => {

  const handleChange = (e) => {
    // Clear errors
    setErrors([])

    // Update value prop
    onValueChanged(e.target.value)
  }

  const runValidator = () => {
    const isEmpty = value.length === 0
    const requiredMissing = required && isEmpty

    const newErrors = []

    if (requiredMissing) {
      // If field is required and is empty, add required error
      newErrors.push(`${label} is required`)
    } else if (validator instanceof Function) {
      try {
        validator(value)
      } catch (e) {
        // If validator throws error, add validation error
        newErrors.push(e.message)
      }
    }

    setErrors([...errors, ...newErrors])

    return newErrors.length === 0
  }

  useImperativeHandle(ref, () => ({
    runValidator
  }))

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
})

FormField.defaultProps = {
  type: 'text',
  placeholder: '',
  hideLabel: false,
  required: false,
  children: null,
  validator: null,
  startIcon: null,
  endIcon: null
}

FormField.propTypes = {
  fieldId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  setErrors: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  hideLabel: PropTypes.bool,
  required: PropTypes.bool,
  children: PropTypes.node,
  validator: PropTypes.func,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node
}

export default FormField
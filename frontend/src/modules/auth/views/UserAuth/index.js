import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { validate } from 'isemail' // Email validation
import zxcvbn from 'zxcvbn' // Password validation
import PasswordStrengthBar from 'react-password-strength-bar'
import AUTH from '../../constants'

// Custom Components
import FormField from '../../components/FormField'

// Material UI Components
import Alert from '@material-ui/lab/Alert'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

// Material UI Icons
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import PersonIcon from '@material-ui/icons/Person'

import styles from './UserAuth.module.scss'

const PASSWORD_MIN_LENGTH = 8
/**
 * zxcbvn ranks password with 4 different strengths
 * 0: too guessable. risky password. (guesses < 10^3)
 * 1: very guessable. protection from throttled online attacks. (guesses < 10^6)
 * 2: somewhat guessable. protection from unthrottled online attacks. (guesses < 10^8)
 * 3: safely unguessable. moderate protection from offline slow-hash scenario. (guesses < 10^10)
 * 4: very unguessable. strong protection from offline slow-hash scenario. (guesses >= 10^10)
 */
const PASSWORD_MIN_STRENGTH = 3
const USERNAME_MAX_LENGTH = 20

function UserAuth({ auth }) {

  const location = useLocation()
  const activePath = location.pathname

  const isSignUp = activePath === '/signup'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const changePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const renderPasswordVisibilityIcon = () => {
    if (isPasswordVisible) {
      return <VisibilityIcon className={styles.clickableIcon} onClick={changePasswordVisibility} />
    } else {
      return <VisibilityOffIcon className={styles.clickableIcon} onClick={changePasswordVisibility} />
    }
  }

  const validateEmail = (value) => {
    if (!validate(value)) {
      throw new Error('Email is invalid')
    }
  }

  const validatePasswordStrength = (value) => {
    if (value.length < PASSWORD_MIN_LENGTH) {
      throw new Error('Password is too short')
    }

    if (zxcvbn(value).score < PASSWORD_MIN_STRENGTH) {
      throw new Error('Password is weak')
    }
  }

  const validateUsername = (value) => {
    if (value.length > USERNAME_MAX_LENGTH) {
      throw new Error('Username too long')
    }
  }

  return (
    <Card className={styles.root}>
      {
        auth.error !== null &&
        <CardHeader
          className={styles.header}
          title={
            <Alert variant="filled" severity="error">
              {auth.error}
            </Alert>
          }
        />
      }
      <CardContent className={styles.content}>
        <Typography variant="h6" align="center">
          {AUTH[activePath].title}
        </Typography>
        <form>
          <FormField
            fieldId="email"
            label="Email"
            type="text"
            validator={isSignUp && validateEmail}
            children={null}
            value={email}
            onValueChanged={setEmail}
            startIcon={<EmailIcon />}
            required={true}
          />
          {
            isSignUp &&
            <FormField
              fieldId="username"
              label="Username"
              type="text"
              validator={validateUsername}
              children={null}
              value={username}
              onValueChanged={setUsername}
              startIcon={<PersonIcon />}
              required={true}
            />
          }
          <FormField
            fieldId="password"
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            validator={isSignUp && validatePasswordStrength}
            children={
              (
                password.length > 0 && isSignUp &&
                <PasswordStrengthBar
                  password={password}
                  minLength={PASSWORD_MIN_LENGTH}
                  scoreWords={['weak', 'weak', 'okay', 'strong', 'very strong']}
                />
              )
            }
            value={password}
            onValueChanged={setPassword}
            startIcon={<LockIcon />}
            endIcon={renderPasswordVisibilityIcon()}
            required={true}
          />
          <Button variant="contained" color="primary" fullWidth={true}>
            {AUTH[activePath].btnText}
          </Button>
        </form>
        <Typography variant="body2" align="center">
          <Link href={AUTH[activePath].navigateTo}>
            {AUTH[activePath].linkText}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(UserAuth)
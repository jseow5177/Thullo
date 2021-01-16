import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PasswordStrengthBar from 'react-password-strength-bar'

// Validators
import { validators, PASSWORD_MIN_LENGTH } from '../../utils'

// Auth constants
import AUTH from '../../constants'

// Auth actions
import { login, signup, clearError } from '../../store/actions'

// Custom Components
import FormField from '../../components/FormField'

// Material UI Components
import Alert from '@material-ui/lab/Alert'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import LoadingButton from '../../../../components/CustomMaterialUI/LoadingButton'

// Material UI Icons
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import PersonIcon from '@material-ui/icons/Person'

import styles from './UserAuth.module.scss'

function UserAuth({ auth, login, signup, clearError, history, location }) {

  const activePath = location.pathname
  const isSignUp = activePath === '/signup'

  const emailRef = useRef()
  const [email, setEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState([])

  const passwordRef = useRef()
  const [password, setPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState([])

  const usernameRef = useRef()
  const [username, setUsername] = useState('')
  const [usernameErrors, setUsernameErrors] = useState([])

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

  const handleSubmit = async () => {
    const emailIsValid = emailRef.current.runValidator()
    const passwordIsValid = passwordRef.current.runValidator()
    const usernameIsValid = usernameRef.current && usernameRef.current.runValidator()

    const canSignUp = isSignUp && emailIsValid && passwordIsValid && usernameIsValid
    const canLogin = !isSignUp && emailIsValid && passwordIsValid

    if (canSignUp) {
      await signup(email, username, password)
    } else if (canLogin) {
      await login(email, password)
    }
  }

  const resetErrors = () => {
    setEmailErrors([]) // Clear email field errors
    setUsernameErrors([]) // Clear username field errors
    setPasswordErrors([]) // Clear password field errors
    clearError() // Clear errors in redux store
  }

  const navigateTo = (e) => {
    e.preventDefault() // Prevent page refresh
    resetErrors() // Clear existing errors
    history.push(AUTH[activePath].navigateTo)
  }

  return (
    <Card className={styles.root}>
      {
        auth.error !== null &&
        <CardHeader
          className={styles.header}
          title={
            <Alert variant="filled" severity="error">
              {auth.error.message}
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
            ref={emailRef}
            fieldId="email"
            label="Email"
            type="text"
            validator={isSignUp ? validators.validateEmail : null}
            children={null}
            value={email}
            onValueChanged={setEmail}
            errors={emailErrors}
            setErrors={setEmailErrors}
            startIcon={<EmailIcon />}
            required={true}
          />
          {
            isSignUp &&
            <FormField
              ref={usernameRef}
              fieldId="username"
              label="Username"
              type="text"
              validator={validators.validateUsername}
              children={null}
              value={username}
              onValueChanged={setUsername}
              errors={usernameErrors}
              setErrors={setUsernameErrors}
              startIcon={<PersonIcon />}
              required={true}
            />
          }
          <FormField
            ref={passwordRef}
            fieldId="password"
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            validator={isSignUp ? validators.validatePasswordStrength : null}
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
            errors={passwordErrors}
            setErrors={setPasswordErrors}
            startIcon={<LockIcon />}
            endIcon={renderPasswordVisibilityIcon()}
            required={true}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth={true}
            onClick={handleSubmit}
            pending={auth.authenticating}
          >
            {AUTH[activePath].btnText}
          </LoadingButton>
        </form>
        <Typography variant="body2" align="center">
          <Link href="" onClick={navigateTo}>
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

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  signup: (email, username, password) => dispatch(signup(email, username, password)),
  clearError: () => dispatch(clearError())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAuth))
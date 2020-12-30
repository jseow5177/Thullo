import { validate } from 'isemail' // Email validation
import zxcvbn from 'zxcvbn' // Password validation

export const USERNAME_MAX_LENGTH = 20
export const PASSWORD_MIN_LENGTH = 8
/**
 * zxcbvn ranks password with 4 different strengths
 * 0: too guessable. risky password. (guesses < 10^3)
 * 1: very guessable. protection from throttled online attacks. (guesses < 10^6)
 * 2: somewhat guessable. protection from unthrottled online attacks. (guesses < 10^8)
 * 3: safely unguessable. moderate protection from offline slow-hash scenario. (guesses < 10^10)
 * 4: very unguessable. strong protection from offline slow-hash scenario. (guesses >= 10^10)
 */
export const PASSWORD_MIN_STRENGTH = 3

// Email, username and password validators
export const validators = {

  validateEmail: (value) => {
    if (!validate(value)) {
      throw new Error('Email is invalid')
    }
  },

  validatePasswordStrength: (value) => {
    if (value.length < PASSWORD_MIN_LENGTH) {
      throw new Error('Password is too short')
    }

    if (zxcvbn(value).score < PASSWORD_MIN_STRENGTH) {
      throw new Error('Password is weak')
    }
  },

  validateUsername: (value) => {
    if (value.length > USERNAME_MAX_LENGTH) {
      throw new Error('Username too long')
    }
  }

}
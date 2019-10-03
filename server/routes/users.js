const express = require('express')
const { check } = require('express-validator')

const validateRequest = require('../middleware/validate-request')
const auth = require('../middleware/auth')

const { registerUser, deleteAuthd } = require('../services/users')

const router = express.Router()

/**
 * @route POST api/users
 * @desc register a user
 * @access public
 */
router.route('/').post(
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check(
      'password',
      'Please provide a password with 6 or more characters'
    ).isLength({ min: 6 }),
    validateRequest,
  ],
  registerUser
)

/**
 * @route DELETE api/profile
 * @desc delete users, profile, and posts
 * @access private
 */
router.route('/').delete(auth, deleteAuthd)

module.exports = router

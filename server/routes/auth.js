const express = require('express')
const { check } = require('express-validator')

const auth = require('../middleware/auth')
const validateRequest = require('../middleware/validate-request')
const { getAuthdRider, loginRider, registerRider } = require('../services/auth')

const router = express.Router()

/**
 * @route POST api/auth/
 * @desc login a rider
 * @access public
 */
router
  .route('/')
  .post(
    [
      check('email', 'Please provide a valid email').isEmail(),
      check('password', 'Password is required').exists(),
      validateRequest,
    ],
    loginRider
  )

/**
 * @route POST api/rider
 * @desc register a rider
 * @access public
 */
router.route('/register').post(
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
  registerRider
)

/**
 * @route GET api/auth
 * @desc get currently authenticated rider information
 * @access private
 */
router.route('/').get(auth, getAuthdRider)

module.exports = router

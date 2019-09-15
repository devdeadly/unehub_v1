const express = require('express')
const { check } = require('express-validator')

const auth = require('../middleware/auth')
const validateRequest = require('../middleware/validate-request')
const { getAuthd, loginUser } = require('../controllers/auth')

const router = express.Router()

/**
 * @route POST api/auth/
 * @desc login a user
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
    loginUser
  )

/**
 * @route GET api/auth
 * @desc get currently authenticated users information
 * @access private
 */
router.route('/').get(auth, getAuthd)

module.exports = router

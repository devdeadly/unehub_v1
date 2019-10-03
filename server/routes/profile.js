const express = require('express')
const { check } = require('express-validator')

const auth = require('../middleware/auth')
const validateRequest = require('../middleware/validate-request')
const {
  getAllProfiles,
  getProfileById,
  getAuthdProfile,
  upsertProfile,
} = require('../services/profile')

const router = express.Router()

/**
 * @route GET api/profile
 * @desc get all profiles
 * @access public
 */
router.route('/').get(getAllProfiles)

/**
 * @route GET api/profile/user/:user_id
 * @desc get single user profile
 * @access public
 */
router.route('/user/:user_id').get(getProfileById)

/**
 * @route GET api/profile/me
 * @desc get profile of authenticated user
 * @access private
 */
router.route('/me').get(auth, getAuthdProfile)

/**
 * @route POST api/profile
 * @desc create or update user profile
 * @access private
 */
router.route('/').post(
  [
    auth,
    check('disciplines', 'Disciplines are required')
      .not()
      .isEmpty(),
    validateRequest,
  ],
  upsertProfile
)

module.exports = router

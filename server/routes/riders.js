const express = require('express')
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const validateRequest = require('../middleware/validate-request')

const { deleteAuthd, getAllRiders, upsertRider } = require('../services/riders')

const router = express.Router()

/**
 * @route POST api/profile
 * @desc create or update user profile
 * @access private
 */
router.route('/').get(getAllRiders)

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
  upsertRider
)

/**
 * @route DELETE api/profile
 * @desc delete riders, profile, and posts
 * @access private
 */
router.route('/').delete(auth, deleteAuthd)

module.exports = router

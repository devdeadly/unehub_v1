const express = require('express')
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const validateRequest = require('../middleware/validate-request')

const {
  deleteAuthd,
  getAllRiders,
  getRiderById,
  updateRider,
} = require('../services/riders')

const router = express.Router()

/**
 * @route GET api/riders
 * @desc get all riders
 * @access public
 */
router.route('/').get(getAllRiders)

/**
 * @route GET api/riders/:rider_id
 * @desc get rider by id
 * @access public
 */
router.route('/:rider_id').get(getRiderById)

/**
 * @route POST api/riders
 * @desc update rider
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
  updateRider
)

/**
 * @route DELETE api/riders
 * @desc delete riders, rider, and posts
 * @access private
 */
router.route('/').delete(auth, deleteAuthd)

module.exports = router

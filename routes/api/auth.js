const bcrypt = require('bcryptjs')
const express = require('express')
const { check } = require('express-validator')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const validateRequest = require('../../middleware/validate-request')
const User = require('../../models/User')
const { genError, handleServerError } = require('../../utils/error')

const router = express.Router()

/**
 * @route POST api/auth/
 * @desc login a user
 * @access public
 */
router.post(
  '/',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    validateRequest,
  ],
  async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).send(genError('Invalid credentials'))
      }

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (!passwordsMatch) {
        res.status(400).send(genError('Invalid credentials'))
      }

      const payload = {
        user: {
          name: user.name,
          id: user._id,
        },
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 99999999999,
      })

      res.json({ token })
    } catch (error) {
      handleServerError(error, res)
    }
  }
)

/**
 * @route GET api/auth
 * @desc get currently authenticated users information
 * @access private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(400).send(genError('User not found'))
  }
})

module.exports = router

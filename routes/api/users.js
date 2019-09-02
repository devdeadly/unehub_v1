const bcrypt = require('bcryptjs')
const express = require('express')
const { check } = require('express-validator')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

const validateRequest = require('../../middleware/validate-request')
const User = require('../../models/User')
const { genError, handleServerError } = require('../../utils/error')

const router = express.Router()

/**
 * @route POST api/users
 * @desc register a user
 * @access public
 */
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check(
      'password',
      'Please provide a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
    validateRequest,
  ],

  async (req, res) => {
    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json(genError('User already exists'))
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })

      user = new User({
        name,
        email,
        password,
        avatar,
      })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 99999999999,
        },
        (err, token) => {
          if (err) throw err
          return res.json({ token })
        }
      )
    } catch (error) {
      handleServerError(error, res)
    }
  }
)

module.exports = router

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { genError, handleServerError } = require('../utils/error')
const { getAvatarByEmail } = require('../utils/avatar')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json(genError('User already exists'))
    }

    const avatar = await getAvatarByEmail(email)
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

const deleteAuthd = async (req, res) => {
  try {
    // @TODO remove user's posts

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id })

    // remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.status(204).json({ msg: 'User deleted' })
  } catch (error) {
    handleServerError(error, res)
  }
}

module.exports = {
  registerUser,
  deleteAuthd,
}

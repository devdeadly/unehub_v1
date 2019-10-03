const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { genError, handleServerError } = require('../utils/error')

const getAuthd = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(400).send(genError('User not found'))
  }
}

const loginUser = async (req, res) => {
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

module.exports = {
  getAuthd,
  loginUser,
}

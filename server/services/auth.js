const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Rider = require('../models/Rider')
const { genError, handleServerError } = require('../utils/error')
const { getAvatarByEmail } = require('../utils/avatar')

const getAuthdRider = async (req, res) => {
  try {
    const rider = await Rider.findById(req.rider.id).select('-password')
    res.json(rider)
  } catch (error) {
    console.error(error)
    res.status(400).send(genError('Rider not found'))
  }
}

const loginRider = async (req, res) => {
  const { email, password } = req.body
  try {
    let rider = await Rider.findOne({ email })

    if (!rider) {
      return res.status(400).send(genError('Invalid credentials'))
    }

    const passwordsMatch = await bcrypt.compare(password, rider.password)

    if (!passwordsMatch) {
      res.status(400).send(genError('Invalid credentials'))
    }

    const payload = {
      rider: {
        name: rider.name,
        id: rider._id,
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

const registerRider = async (req, res) => {
  const { name, email, password } = req.body

  try {
    let rider = await Rider.findOne({ email })

    if (rider) {
      return res.status(400).json(genError('Rider already exists'))
    }

    const avatar = await getAvatarByEmail(email)
    rider = new Rider({
      name,
      email,
      password,
      avatar,
    })

    const salt = await bcrypt.genSalt(10)

    rider.password = await bcrypt.hash(password, salt)

    await rider.save()

    const payload = {
      rider: {
        id: rider.id,
        name: rider.name,
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

module.exports = {
  getAuthdRider,
  loginRider,
  registerRider,
}

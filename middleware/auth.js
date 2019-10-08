const jwt = require('jsonwebtoken')

const { genError } = require('../utils/error')

module.exports = (req, res, next) => {
  // get token from header
  const token = req.header('x-auth-token')

  // check if no token
  if (!token) {
    return res.status(401).json(genError('No token, authorization denied'))
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.rider = decoded.rider
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json(genError('Token is not valid'))
  }
}

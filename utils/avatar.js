const libravatar = require('libravatar')

const getAvatarByEmail = email => {
  return new Promise((resolve, reject) => {
    try {
      libravatar.url(
        {
          email,
          size: 400,
          default: 'mm',
          https: false,
        },
        (error, avatar_url) => {
          if (error) reject(error)
          resolve(avatar_url)
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getAvatarByEmail,
}

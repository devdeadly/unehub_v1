const libravatar = require('libravatar')

const getAvatarByEmail = async email => {
  try {
    const libravatar_url = await libravatar.get_avatar_url(
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
    return libravatar_url
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAvatarByEmail,
}

const crypto = require('crypto')

const newRider = {
  name: 'Test Rider',
  email: `${crypto.randomBytes(5).toString('hex')}@example.com`, // generate random email
  password: 'password',
}

const newProfile = {
  location: 'Queens, NY',
  birthday: '02/10/1987',
  disciplines: 'street, flat, trials',
  website: 'https://example.com',
  bio: 'born and raised in ny',
  youtube: 'https://youtube.com/fake',
  twitter: 'https://twitter.com/fake',
  instagram: 'https://instagram.com/fake',
  facebook: 'https://facebook.com/fake',
}

module.exports = {
  newRider,
  newProfile,
}

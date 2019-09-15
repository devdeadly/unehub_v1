const expect = require('expect.js')
const jwt = require('jsonwebtoken')
const request = require('supertest')

//fixtures
const { newUser, newProfile } = require('./fixtures')

const app = require('../server')
const db = require('../db/db')

let userObjectId, jwtToken

before(done => {
  app.on('READY', () => {
    done()
  })
})

after(done => {
  db.disconnect()
    .then(() => {
      done()
      process.exit()
    })
    .catch(err => {
      done(err)
      process.exit()
    })
})

describe("easy", () => {
  expect(2).to.be(2);
})

describe('INTEGRATION TESTS'.magenta.bold, () => {
  describe('POST /api/users'.magenta, () => {
    it('should successfully register a user', done => {
      request(app)
        .post('/api/users')
        .send(newUser)
        .then(res => {
          jwtToken = res.body.token
          const decoded = jwt.decode(jwtToken, process.env.JWT_SECRET)
          userObjectId = decoded.user.id
          expect(res.status).to.be(200)
          done()
        })
        .catch(error => {
          done(error)
        })
    })
  })

  describe('POST /api/users'.magenta, () => {
    it('should fail when no name, email, and password in request', () => {
      request(app)
        .post('/api/users')
        .send({})
        .then(res => {
          const { errors } = res.body
          // three errors are requried name, email, and password
          expect(errors.length).to.be(3)
        })
    })
  })

  describe('POST /api/profile'.magenta, () => {
    it('should create a profile', done => {
      request(app)
        .post('/api/profile')
        .set('x-auth-token', jwtToken)
        .send(newProfile)
        .then(res => {
          done()
        })
        .catch(error => done(error))
    })
  })

  describe('GET /api/profile'.magenta, () => {
    it('should get all profiles', async () => {
      await request(app)
        .get('/api/profile')
        .expect(200)
    })
  })

  describe(`GET /api/profile/user/${userObjectId}`.magenta, () => {
    it('should return 200 on successful user id', async () => {
      await request(app)
        .get(`/api/profile/user/${userObjectId}`)
        .expect(200)
    })
  })

  describe('GET /api/profile/user/invalid-id'.magenta, () => {
    it('should return 400 on faulty user id', async () => {
      await request(app)
        .get('/api/profile/user/invalid-id')
        .expect(400)
    })
  })

  describe('GET /api/profile/me/'.magenta, () => {
    it('should return profile of authenticated user', done => {
      request(app)
        .get('/api/profile/me/')
        .set('x-auth-token', jwtToken)
        .then(res => {
          expect(res.body.user._id).to.be(userObjectId)
          expect(res.status).to.be(200)
          done()
        })
        .catch(error => done(error))
    })
  })

  describe('DELETE /api/users/'.magenta, () => {
    it('should delete profile of authenticated user', done => {
      request(app)
        .delete('/api/users/')
        .set('x-auth-token', jwtToken)
        .then(res => {
          expect(res.status).to.be(204)
          done()
        })
        .catch(error => done(error))
    })

    it('should block unauthenticated deletions', done => {
      request(app)
        .delete('/api/users/')
        .then(res => {
          expect(res.status).to.be(401)
          done()
        })
        .catch(error => done(error))
    })
  })
})

const expect = require('expect.js')
const jwt = require('jsonwebtoken')
const request = require('supertest')

//fixtures
const { newRider, newProfile } = require('./fixtures')

const app = require('../server')
const db = require('../db/db')

let riderObjectId, jwtToken

before(function(done) {
  this.enableTimeouts(false)
  app.on('READY', () => {
    done()
  })
})

after(done => {
  console.log('disconnecting')
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

describe('INTEGRATION TESTS'.magenta.bold, () => {
  describe('POST /api/riders'.magenta, () => {
    it('should successfully register a rider', done => {
      request(app)
        .post('/api/riders')
        .send(newRider)
        .then(res => {
          jwtToken = res.body.token
          const decoded = jwt.decode(jwtToken, process.env.JWT_SECRET)
          riderObjectId = decoded.rider.id
          expect(res.status).to.be(200)
          done()
        })
        .catch(error => {
          done(error)
        })
    })
  })

  describe('POST /api/riders'.magenta, () => {
    it('should fail when no name, email, and password in request', () => {
      request(app)
        .post('/api/riders')
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

  describe(`GET /api/profile/rider/${riderObjectId}`.magenta, () => {
    it('should return 200 on successful rider id', async () => {
      await request(app)
        .get(`/api/profile/rider/${riderObjectId}`)
        .expect(200)
    })
  })

  describe('GET /api/profile/rider/invalid-id'.magenta, () => {
    it('should return 400 on faulty rider id', async () => {
      await request(app)
        .get('/api/profile/rider/invalid-id')
        .expect(400)
    })
  })

  describe('GET /api/profile/me/'.magenta, () => {
    it('should return profile of authenticated rider', done => {
      request(app)
        .get('/api/profile/me/')
        .set('x-auth-token', jwtToken)
        .then(res => {
          expect(res.body.rider._id).to.be(riderObjectId)
          expect(res.status).to.be(200)
          done()
        })
        .catch(error => done(error))
    })
  })

  describe('DELETE /api/riders/'.magenta, () => {
    it('should delete profile of authenticated rider', done => {
      request(app)
        .delete('/api/riders/')
        .set('x-auth-token', jwtToken)
        .then(res => {
          expect(res.status).to.be(204)
          done()
        })
        .catch(error => done(error))
    })

    it('should block unauthenticated deletions', done => {
      request(app)
        .delete('/api/riders/')
        .then(res => {
          expect(res.status).to.be(401)
          done()
        })
        .catch(error => done(error))
    })
  })
})

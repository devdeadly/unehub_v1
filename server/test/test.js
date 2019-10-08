const expect = require('expect.js')
const jwt = require('jsonwebtoken')
const request = require('supertest')

const app = require('../server')
const { newRider, newRiderAddedInfo } = require('./fixtures')
const db = require('../db/db')

let riderObjectId, jwtToken

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

describe('INTEGRATION TEST SUITE'.green.bold, () => {
  it('should successfully register a rider', done => {
    request(app)
      .post('/api/auth/register')
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
  it('should fail when no name, email, and password in request', done => {
    request(app)
      .post('/api/auth/register')
      .send({})
      .then(res => {
        const { errors } = res.body
        // three errors are requried name, email, and password
        expect(errors.length).to.be(3)
        done()
      })
  })
  it('should update a rider', done => {
    request(app)
      .post('/api/riders')
      .set('x-auth-token', jwtToken)
      .send(newRiderAddedInfo)
      .then(res => {
        done()
      })
      .catch(error => done(error))
  })
  it('should get all riders', async () => {
    await request(app)
      .get('/api/riders')
      .expect(200)
  })
  it('should return 200 on successful rider id', async () => {
    await request(app)
      .get(`/api/riders/${riderObjectId}`)
      .expect(200)
  })
  it('should return 400 on faulty rider id', async () => {
    await request(app)
      .get('/api/riders/invalid-id')
      .expect(400)
  })
  it('should return authenticated rider', done => {
    request(app)
      .get('/api/auth/')
      .set('x-auth-token', jwtToken)
      .then(res => {
        expect(res.body._id).to.be(riderObjectId)
        expect(res.status).to.be(200)
        done()
      })
      .catch(error => done(error))
  })
  it('should delete rider of authenticated rider', done => {
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

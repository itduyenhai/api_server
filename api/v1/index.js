import express from 'express'
import ctrl from './controllers'
import isAuth from './middlewares/auth'

const api = express.Router()

// Auth
api.post('/signup', ctrl.auth.signup)
api.post('/signin', ctrl.auth.signin)

// Home
api.get('/', (req, res) => {
    res.json({ message: 'Home' })
})

// User
api.get('/user', ctrl.user.list)
api.get('/user/:id', ctrl.user.get)
api.post('/user', ctrl.user.create)
api.put('/user/:id', ctrl.user.update)
api.delete('/user/:id', ctrl.user.delete)

// Private
api.get('/private', isAuth, function(req, res) {
    res.json({ message: 'Auth' })
})

module.exports = api
const { Router } = require('express')
const { GetLogin, PostLogin, ProtetectedLogin, Logout } = require('../Controller/Login.Controller')
const { authenticateUser } = require('../Middleware/Auth.Middleware')
const { Log } = require('../Middleware/Log.Middleware')

const LoginRouter = Router()

LoginRouter.get('/login',Log, GetLogin)
LoginRouter.post('/login', PostLogin)
LoginRouter.get('/protected', authenticateUser, ProtetectedLogin)
LoginRouter.get('/logout', Logout);

module.exports = LoginRouter
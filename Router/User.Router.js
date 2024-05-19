const { Router } = require('express')
const { GetUser, PromoteUser } = require('../Controller/User.Controller')
const { ViewUser } = require('../Middleware/Manager.Middleware')
const { Admin } = require('../Middleware/Admin.Middleware')

const UserRouter = Router()

UserRouter.get('/user',Admin, GetUser)
UserRouter.post('/promote/:id', PromoteUser)

module.exports = UserRouter
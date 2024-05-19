const { Router } = require('express')
const { GetError } = require('../Controller/Error.Controller')

const ErrorRouter = Router()

ErrorRouter.get('/error', GetError)

module.exports = ErrorRouter
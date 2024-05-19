const { Router } = require('express')
const { GetRegister, PostRegister, VerifyOTPAndRegister } = require('../Controller/Register.Controller');
const { Log } = require('../Middleware/Log.Middleware');

const RegisterRoute = Router()

RegisterRoute.get('/', Log, GetRegister);
RegisterRoute.post('/', PostRegister);
RegisterRoute.post('/register', VerifyOTPAndRegister);

module.exports = RegisterRoute